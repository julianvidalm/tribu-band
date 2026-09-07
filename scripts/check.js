// Data validator: npm run check
//
// Verifies the setlist data before the build. Blocking checks make the
// process exit with code 1 so `npm run build` refuses to produce a file that
// would draw wrong or missing chords on stage. Report-only sections print
// information for a human to judge (chromatic notes are often intentional).
import { SHAPES, SHAPES_ALT, SHAPES_ADV } from "../src/data/chords.js";
import { SET } from "../src/data/setlist.js";
import { splitBars } from "../src/lib/bars.js";
import { libFor } from "../src/lib/diagram.js";
import { checkShape, keyScale, outOfKey } from "../src/lib/theory.js";
import { transposeKey, keySpelling, transposeSymbol, resolveShape } from "../src/lib/transpose.js";

const MODES = [
  { key: "b", label: "Basico", lib: SHAPES },
  { key: "t", label: "Triadas", lib: SHAPES_ALT },
  { key: "g", label: "Avanzado", lib: SHAPES_ADV },
];
// Section field -> runtime mode key used by libFor().
const MODE_OF_FIELD = { b: "b", t: "t", g: "a" };

let blocking = 0;
const pad = (n) => String(n).padStart(2, "0");
const song = (s) => pad(s.n) + " " + s.t;
const section = (n) => console.log("\n== " + n + " ==");
const problem = (msg) => { blocking++; console.log("  FAIL  " + msg); };
const info = (msg) => console.log("  " + msg);

/* 1. Shapes vs symbols */
section("1. Shapes vs chord symbols (blocking)");
{
  const libs = [["SHAPES", SHAPES], ["SHAPES_ALT", SHAPES_ALT], ["SHAPES_ADV", SHAPES_ADV]];
  let total = 0, bad = 0;
  for (const [name, lib] of libs) {
    for (const [symbol, shape] of Object.entries(lib)) {
      total++;
      let r;
      try {
        r = checkShape(symbol, shape);
      } catch (e) {
        bad++;
        problem(name.padEnd(10) + " " + symbol.padEnd(8) + " [" + shape + "]  " + e.message);
        continue;
      }
      if (r.ok) continue;
      bad++;
      const parts = [];
      if (r.missing.length) parts.push("missing: " + r.missing.join(", "));
      if (r.extra.length) parts.push("extra: " + r.extra.join(", "));
      if (r.bassError) parts.push("bass: " + r.bassError);
      problem(name.padEnd(10) + " " + symbol.padEnd(8) + " [" + shape + "]  " + parts.join("  "));
    }
  }
  info(total + " shapes checked, " + bad + " wrong");
}

/* 2. b/t/g parity */
section("2. b/t/g parity per section (blocking)");
{
  let sections = 0, bad = 0;
  for (const s of SET) {
    for (const x of s.secs) {
      sections++;
      const bars = { b: splitBars(x.b), t: splitBars(x.t), g: splitBars(x.g) };
      const sameBars = bars.b.length === bars.t.length && bars.b.length === bars.g.length;
      const sameChords = sameBars && bars.b.every((bar, i) => bar.length === bars.t[i].length && bar.length === bars.g[i].length);
      if (sameBars && sameChords) continue;
      bad++;
      problem(song(s) + " / " + x.n + (sameBars ? " (chords per bar differ)" : " (bar count differs)"));
      info("    b: " + x.b);
      info("    t: " + x.t);
      info("    g: " + x.g);
    }
  }
  info(sections + " sections checked, " + bad + " misaligned");
}

/* 3. Orphans and silent fallbacks */
section("3. Chord names without a shape (blocking)");
{
  const fallbacks = new Map(); // "mode symbol" -> Set of song labels
  let orphans = 0;
  for (const s of SET) {
    for (const x of s.secs) {
      for (const m of MODES) {
        for (const bar of splitBars(x[m.key])) {
          for (const symbol of bar) {
            if (m.lib[symbol]) continue;
            if (SHAPES[symbol]) {
              if (m.key !== "b") {
                const k = m.label + "  " + symbol;
                if (!fallbacks.has(k)) fallbacks.set(k, new Set());
                fallbacks.get(k).add(song(s));
              }
              continue;
            }
            orphans++;
            problem(song(s) + " / " + x.n + "  mode " + m.label + "  " + symbol + " has no shape in any library");
          }
        }
      }
    }
  }
  info(orphans + " orphan chord names");
  if (fallbacks.size) {
    info("INFO: chords drawn with the basic SHAPES fingering because the mode library lacks them:");
    for (const [k, songs] of [...fallbacks.entries()].sort()) {
      info("    " + k.padEnd(18) + " <- " + [...songs].join(", "));
    }
  }
}

/* 4. Tonal coherence */
section("4. Notes outside the song key (report only)");
{
  for (const s of SET) {
    const key = keyScale(s.k);
    if (!key || !s.secs.length) continue;
    const found = new Map(); // symbol -> Set of note names
    for (const x of s.secs) {
      for (const m of MODES) {
        for (const bar of splitBars(x[m.key])) {
          for (const symbol of bar) {
            const shape = libFor(MODE_OF_FIELD[m.key])[symbol] || SHAPES[symbol];
            if (!shape) continue;
            const notes = outOfKey(symbol, shape, key);
            if (!notes.length) continue;
            if (!found.has(symbol)) found.set(symbol, new Set());
            notes.forEach((n) => found.get(symbol).add(n));
          }
        }
      }
    }
    const label = song(s) + " (" + s.k + "): ";
    if (!found.size) { info(label + "all chords in key"); continue; }
    info(label + [...found.entries()].map(([sym, notes]) => sym + " -> " + [...notes].join(", ")).join("; "));
  }
}

/* 5. Status */
section("5. Verification status");
{
  const groups = { ok: [], oido: [], dud: [] };
  for (const s of SET) (groups[s.v] || (groups[s.v] = [])).push(song(s));
  for (const [v, list] of Object.entries(groups)) {
    info(v.padEnd(5) + list.length + "  " + list.join(" · "));
  }
}

/* 6. Transpositions */
section("6. Every chord at all 12 transpositions (blocking)");
{
  const stats = { exact: 0, basic: 0, shifted: 0 };
  let checked = 0, failed = 0;
  const cache = new Map(); // "mode symbol n" -> result, chords repeat a lot across songs
  for (const s of SET) {
    if (!s.secs.length) continue;
    for (let n = -5; n <= 6; n++) {
      if (n === 0) continue;
      const spelling = keySpelling(transposeKey(s.k, n));
      for (const x of s.secs) {
        for (const m of MODES) {
          for (const bar of splitBars(x[m.key])) {
            for (const symbol of bar) {
              checked++;
              let transposed;
              try { transposed = transposeSymbol(symbol, n, spelling); } catch (e) {
                failed++;
                problem(song(s) + "  " + m.label + "  " + (n > 0 ? "+" : "") + n + "  " + symbol + "  " + e.message);
                continue;
              }
              const key = m.key + " " + transposed;
              let r = cache.get(key);
              if (r === undefined) {
                try { r = resolveShape(transposed, MODE_OF_FIELD[m.key]); } catch (e) { r = null; }
                cache.set(key, r);
              }
              if (!r) {
                failed++;
                problem(song(s) + "  " + m.label + "  " + (n > 0 ? "+" : "") + n + "  " + symbol + " -> " + transposed + "  (no shape)");
                continue;
              }
              stats[r.source]++;
            }
          }
        }
      }
    }
  }
  info(checked + " (song, n, chord) combinations checked, " + failed + " without a shape");
  info("resolved by exact library entry: " + stats.exact + " · basic fallback: " + stats.basic + " · shifted shape: " + stats.shifted);
}

console.log("\ncheck: " + blocking + " blocking problem" + (blocking === 1 ? "" : "s"));
process.exit(blocking ? 1 : 0);
