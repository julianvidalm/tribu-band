import { SHAPES } from "../data/chords.js";
import { mod12, parseNote, noteName, parseChord, checkShape } from "./theory.js";
import { libFor } from "./diagram.js";
import { isChordLine } from "./lyrics.js";

/* ============ TRANSPOSITION ============ */
// Real transposition: every chord name moves by n semitones and its diagram
// is looked up again in the mode library (a transposed D is drawn as D, its
// triad and its advanced voicing), never as a capo over the original shapes.

const KEY_RE = /^([A-G][#b]?)(m|min)?$/;

// Keys conventionally written with flats. Major pc 6 is named F# (not Gb) so
// generated key names match the picker list; an explicit "Gb" still reads
// as a flat key.
const KEY_FLAT_MAJOR_NAMES = new Set([5, 10, 3, 8, 1]);
const KEY_FLAT_MAJOR = new Set([5, 10, 3, 8, 1, 6]);
const KEY_FLAT_MINOR = new Set([2, 7, 0, 5, 10, 3]);

function keyInfo(token) {
  const m = KEY_RE.exec(token || "");
  if (!m) return null;
  return { root: parseNote(m[1]), mode: m[2] ? "minor" : "major", flatName: m[1].includes("b"), suffix: m[2] || "" };
}

// Spelling ("flats" | "sharps") for a key of the given pitch class and mode.
export function spellingFor(pc, mode) {
  const set = mode === "minor" ? KEY_FLAT_MINOR : KEY_FLAT_MAJOR_NAMES;
  return set.has(mod12(pc)) ? "flats" : "sharps";
}

// Conventional name of a key: keyName(10, "minor") -> "Bbm".
export function keyName(pc, mode) {
  return noteName(pc, { flats: spellingFor(pc, mode) === "flats" }) + (mode === "minor" ? "m" : "");
}

// "C / Am" -> "sharps"; "Ebm" -> "flats". Unknown keys default to sharps.
export function keySpelling(keyString) {
  const info = keyInfo(String(keyString || "").trim().split(/\s+/)[0]);
  if (!info) return "sharps";
  if (info.flatName) return "flats";
  const set = info.mode === "minor" ? KEY_FLAT_MINOR : KEY_FLAT_MAJOR;
  return set.has(info.root) ? "flats" : "sharps";
}

export function normalizeSemitones(n) {
  return mod12(n + 5) - 5;
}

// "C / Am" + 2 -> "D / Bm". Tokens that are not keys ("/", "?") stay as is.
export function transposeKey(k, n) {
  const str = String(k || "");
  if (!n || str.trim() === "?") return str;
  return str.split(/(\s+)/).map((tok) => {
    const info = keyInfo(tok);
    if (!info) return tok;
    return keyName(info.root + n, info.mode);
  }).join("");
}

// "Am7" + 3 -> "Cm7"; "F/C" + 2 -> "G/D". The quality text is kept verbatim.
export function transposeSymbol(symbol, n, spelling = "sharps") {
  const chord = parseChord(symbol);
  const m = /^([A-G][#b]?)(.*?)(?:\/([A-G][#b]?))?$/.exec(symbol);
  const flats = spelling === "flats";
  let out = noteName(chord.root + n, { flats }) + m[2];
  if (chord.bass !== null) out += "/" + noteName(chord.bass + n, { flats });
  return out;
}

// Moves every sounding string by delta frets (open strings become fretted),
// then brings the shape into the playable range by whole octaves: no fret
// below 0 and, when possible, the lowest fret below 12.
export function shiftShape(shape, delta) {
  const muted = shape.map((f) => f < 0);
  let frets = shape.map((f, i) => (muted[i] ? 0 : f + delta));
  const min = () => Math.min(...frets.filter((f, i) => !muted[i]));
  if (muted.every(Boolean)) return shape.slice();
  while (min() < 0) frets = frets.map((f) => f + 12);
  while (min() >= 12) frets = frets.map((f) => f - 12);
  return frets.map((f, i) => (muted[i] ? -1 : f));
}

const MAX_FRET = 15;
const inRange = (shape) => shape.every((f) => f <= MAX_FRET);
const maxFret = (shape) => Math.max(...shape);
const minFret = (shape) => Math.min(...shape.filter((f) => f >= 0));

function passes(symbol, shape) {
  try { return checkShape(symbol, shape).ok; } catch (e) { return false; }
}

// Finds a fingering for `symbol` in the given mode: an exact library entry
// first, the basic library next (as diagrama() falls back today), and
// otherwise the same-quality library shape that lands lowest on the neck
// once shifted to the new root. Returns { shape, source } or null.
export function resolveShape(symbol, modo, libs) {
  const modeLib = libs ? libs.mode : libFor(modo);
  const basic = libs ? libs.basic : SHAPES;
  const target = parseChord(symbol);
  const targetBass = target.bass === null ? null : mod12(target.bass - target.root);

  if (modeLib[symbol] && passes(symbol, modeLib[symbol])) return { shape: modeLib[symbol], source: "exact" };
  if (modeLib !== basic && basic[symbol] && passes(symbol, basic[symbol])) return { shape: basic[symbol], source: "basic" };

  let best = null;
  const consider = (lib) => {
    for (const [name, shape] of Object.entries(lib)) {
      let cand;
      try { cand = parseChord(name); } catch (e) { continue; }
      if (cand.quality !== target.quality) continue;
      const candBass = cand.bass === null ? null : mod12(cand.bass - cand.root);
      if (candBass !== targetBass) continue;
      const shifted = shiftShape(shape, mod12(target.root - cand.root));
      if (!inRange(shifted) || !passes(symbol, shifted)) continue;
      if (!best || maxFret(shifted) < maxFret(best) || (maxFret(shifted) === maxFret(best) && minFret(shifted) < minFret(best))) best = shifted;
    }
  };
  consider(modeLib);
  if (modeLib !== basic) consider(basic);
  return best ? { shape: best, source: "shifted" } : null;
}

// Transposed copy of an ESCALAS entry: new root name and root fret.
// Minor boxes are drawn from R, major boxes from R-1, hence the ranges.
export function transposeScale(entry, n) {
  if (!n) return entry;
  const mode = entry.t === "menor" ? "minor" : "major";
  const pc = parseNote(entry.r) + n;
  const lo = mode === "minor" ? 1 : 2;
  let R = entry.R + n;
  while (R < lo) R += 12;
  while (R > lo + 11) R -= 12;
  return { ...entry, r: noteName(pc, { flats: spellingFor(pc, mode) === "flats" }), R };
}

const TOKEN_RE = /[A-G][#b]?[^\s|]*/g;

// Transposes the chords of one chord line, keeping every chord on its
// original column when possible. A name that grows eats spaces from the gap
// after it (never below one space); a name that shrinks pads the gap back.
export function transposeLyricLine(line, n, spelling = "sharps") {
  if (!n || !isChordLine(line)) return line;
  let out = "", pos = 0;
  const pushGap = (gap) => {
    const drift = out.length - pos;
    if (drift < 0) gap = " ".repeat(-drift) + gap;
    else if (drift > 0) {
      const lead = /^ */.exec(gap)[0].length;
      const keep = gap.length === lead && gap.length > 0 ? 1 : 0;
      gap = gap.slice(Math.min(drift, Math.max(lead - keep, 0)));
    }
    out += gap;
  };
  for (const m of line.matchAll(TOKEN_RE)) {
    pushGap(line.slice(pos, m.index));
    pos = m.index;
    let tok = m[0];
    try { tok = transposeSymbol(m[0], n, spelling); } catch (e) { /* not a chord: keep */ }
    out += tok;
    pos += m[0].length;
  }
  pushGap(line.slice(pos));
  return out;
}

export function transposeLyrics(text, n, spelling = "sharps") {
  if (!text || !n) return text;
  return text.split("\n").map((l) => transposeLyricLine(l, n, spelling)).join("\n");
}
