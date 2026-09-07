/* ============ CHORD THEORY ============ */
// Pure pitch-class arithmetic used by the validator and the tests.
// Pitch classes are integers 0..11 with C = 0. Shapes follow the same
// convention as src/data/chords.js: [6th, 5th, 4th, 3rd, 2nd, 1st],
// -1 = muted string, 0 = open string, n = fret n.

const NAMES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const NAMES_FLAT = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

// Standard tuning E A D G B e, index 0 = 6th string.
export const TUNING = [4, 9, 2, 7, 11, 4];

const mod12 = (n) => ((n % 12) + 12) % 12;

export function parseNote(name) {
  const m = /^([A-G])([#b]?)$/.exec(name || "");
  if (!m) throw new Error("Unknown note: " + name);
  return mod12(LETTER_PC[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0));
}

export function noteName(pc, { flats = false } = {}) {
  return (flats ? NAMES_FLAT : NAMES_SHARP)[mod12(pc)];
}

// Sorted unique pitch classes of every sounding string.
export function shapeNotes(shape) {
  const pcs = new Set();
  shape.forEach((fret, i) => {
    if (fret >= 0) pcs.add(mod12(TUNING[i] + fret));
  });
  return [...pcs].sort((a, b) => a - b);
}

// Pitch class of the lowest sounding string, or null when everything is muted.
export function shapeBass(shape) {
  for (let i = 0; i < shape.length; i++) {
    if (shape[i] >= 0) return mod12(TUNING[i] + shape[i]);
  }
  return null;
}

export function soundingStrings(shape) {
  return shape.filter((f) => f >= 0).length;
}

// Interval roles (semitones from the root).
const ROOT = 0, MIN3 = 3, MAJ3 = 4, P5 = 7, MIN7 = 10, MAJ7 = 11, NINTH = 2;

const MAJ = [ROOT, MAJ3, P5];
const MIN = [ROOT, MIN3, P5];

// quality suffix -> intervals. Order of keys does not matter: the parser
// matches the whole suffix exactly.
const QUALITIES = {
  "": MAJ,
  "maj": MAJ,
  "m": MIN,
  "min": MIN,
  "5": [ROOT, P5],
  "dim": [ROOT, MIN3, 6],
  "aug": [ROOT, MAJ3, 8],
  "sus2": [ROOT, 2, P5],
  "sus4": [ROOT, 5, P5],
  "sus": [ROOT, 5, P5],
  "7": [...MAJ, MIN7],
  "maj7": [...MAJ, MAJ7],
  "m7": [...MIN, MIN7],
  "mmaj7": [...MIN, MAJ7],
  "dim7": [ROOT, MIN3, 6, 9],
  "m7b5": [ROOT, MIN3, 6, MIN7],
  "9": [...MAJ, MIN7, NINTH],
  "maj9": [...MAJ, MAJ7, NINTH],
  "m9": [...MIN, MIN7, NINTH],
  "11": [...MAJ, MIN7, NINTH, 5],
  "13": [...MAJ, MIN7, NINTH, 9],
  "6": [...MAJ, 9],
  "m6": [...MIN, 9],
  "6/9": [...MAJ, 9, NINTH],
  "add9": [...MAJ, NINTH],
  "madd9": [...MIN, NINTH],
  "7b9": [...MAJ, MIN7, 1],
  "7#9": [...MAJ, MIN7, 3],
  "7sus4": [ROOT, 5, P5, MIN7],
};

// Qualities where the 9th is customarily omitted, so it is not required.
const OPTIONAL_NINTH = new Set(["11", "13"]);

// Which intervals may be omitted from a voicing without changing the chord:
// - the perfect 5th, always;
// - the root, when the chord has a 7th (the bass supplies it);
// - the 9th, in 11 and 13 chords.
// Power chords ("5") have nothing optional: the 5th IS the chord.
function optionalIntervals(quality, intervals) {
  if (quality === "5") return new Set();
  const opt = new Set([P5]);
  if (intervals.has(MIN7) || intervals.has(MAJ7)) opt.add(ROOT);
  if (OPTIONAL_NINTH.has(quality)) opt.add(NINTH);
  return opt;
}

// "Am7/G" -> { root: 9, bass: 7, quality: "m7", intervals: Set, required, optional }
export function parseChord(symbol) {
  const m = /^([A-G][#b]?)(.*?)(?:\/([A-G][#b]?))?$/.exec(symbol || "");
  if (!m || !(m[2] in QUALITIES)) throw new Error("Unknown chord symbol: " + symbol);
  const root = parseNote(m[1]);
  const quality = m[2];
  const intervals = new Set(QUALITIES[quality].map(mod12));
  const opt = optionalIntervals(quality, intervals);
  const required = [...intervals].filter((i) => !opt.has(i));
  const optional = [...intervals].filter((i) => opt.has(i));
  return {
    symbol,
    root,
    rootName: m[1],
    bass: m[3] ? parseNote(m[3]) : null,
    quality,
    intervals,
    required,
    optional,
  };
}

// Pitch classes that must sound for this chord in this voicing.
// On top of the chord's own required intervals, the root is optional in
// voicings of four strings or fewer (small boxes leave the root to the bass).
export function requiredNotes(chord, shape) {
  let req = chord.required;
  if (soundingStrings(shape) <= 4) req = req.filter((i) => i !== ROOT);
  return req.map((i) => mod12(chord.root + i));
}

function prefersFlatsFor(chord) {
  return chord.rootName.includes("b");
}

// Compare a fingering against the notes its symbol promises.
export function checkShape(symbol, shape) {
  const chord = parseChord(symbol);
  const flats = prefersFlatsFor(chord);
  const name = (pc) => noteName(pc, { flats });
  const notes = shapeNotes(shape);
  const allowed = new Set([...chord.intervals].map((i) => mod12(chord.root + i)));
  if (chord.bass !== null) allowed.add(chord.bass);

  const missing = requiredNotes(chord, shape).filter((pc) => !notes.includes(pc)).map(name);
  const extra = notes.filter((pc) => !allowed.has(pc)).map(name);

  let bassError = null;
  const bass = shapeBass(shape);
  if (bass === null) bassError = "no sounding strings";
  else if (chord.bass !== null && bass !== chord.bass) {
    bassError = "bass is " + name(bass) + ", expected " + name(chord.bass);
  }

  return { ok: missing.length === 0 && extra.length === 0 && bassError === null, missing, extra, bassError };
}

/* ============ KEYS ============ */
const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11];
const MINOR_SCALE = [0, 2, 3, 5, 7, 8, 10];
// Keys conventionally spelled with flats (major / relative minor).
const FLAT_MAJOR = new Set([5, 10, 3, 8, 1, 6]);
const FLAT_MINOR = new Set([2, 7, 0, 5, 10, 3]);

// "C / Am" -> C major. "Am" -> A natural minor. "?" -> null.
export function keyScale(k) {
  const token = String(k || "").trim().split(/\s+/)[0];
  const m = /^([A-G][#b]?)(m|min)?$/.exec(token);
  if (!m) return null;
  const root = parseNote(m[1]);
  const mode = m[2] ? "minor" : "major";
  const scale = mode === "minor" ? MINOR_SCALE : MAJOR_SCALE;
  const flats = m[1].includes("b") || (mode === "minor" ? FLAT_MINOR : FLAT_MAJOR).has(root);
  return { root, rootName: m[1], mode, flats, pcs: new Set(scale.map((i) => mod12(root + i))) };
}

// Note names of the shape that fall outside the key's diatonic scale.
// In minor keys the raised leading tone is always spelled sharp (C# in Dm),
// even when the key signature itself uses flats.
export function outOfKey(symbol, shape, key) {
  if (!key) return [];
  const leadingTone = mod12(key.root + 11);
  return shapeNotes(shape)
    .filter((pc) => !key.pcs.has(pc))
    .map((pc) => noteName(pc, { flats: key.flats && !(key.mode === "minor" && pc === leadingTone) }));
}
