import { test } from "node:test";
import assert from "node:assert/strict";
import {
  keySpelling, keyName, transposeKey, transposeSymbol, normalizeSemitones,
  shiftShape, resolveShape, transposeScale, transposeLyricLine, transposeLyrics,
} from "../src/lib/transpose.js";
import { checkShape } from "../src/lib/theory.js";

test("keySpelling follows the key signature of the first token", () => {
  assert.equal(keySpelling("Am"), "sharps");
  assert.equal(keySpelling("C / Am"), "sharps");
  assert.equal(keySpelling("Dm"), "flats");
  assert.equal(keySpelling("Ebm"), "flats");
  assert.equal(keySpelling("F"), "flats");
  assert.equal(keySpelling("Gb"), "flats");
  assert.equal(keySpelling("E"), "sharps");
  assert.equal(keySpelling("?"), "sharps");
});

test("keyName spells keys conventionally", () => {
  assert.equal(keyName(10, "minor"), "Bbm");
  assert.equal(keyName(1, "minor"), "C#m");
  assert.equal(keyName(1, "major"), "Db");
  assert.equal(keyName(6, "major"), "F#");
  assert.equal(keyName(3, "minor"), "Ebm");
});

test("transposeKey moves every key token", () => {
  assert.equal(transposeKey("Am", 2), "Bm");
  assert.equal(transposeKey("Am", 1), "Bbm");
  assert.equal(transposeKey("C / Am", 2), "D / Bm");
  assert.equal(transposeKey("Ebm", -3), "Cm");
  assert.equal(transposeKey("Ebm", 2), "Fm");
  assert.equal(transposeKey("?", 3), "?");
  assert.equal(transposeKey("Am", 0), "Am");
});

test("transposeSymbol keeps the quality and spells by the target key", () => {
  assert.equal(transposeSymbol("Am7", 3), "Cm7");
  assert.equal(transposeSymbol("A", 1, "sharps"), "A#");
  assert.equal(transposeSymbol("A", 1, "flats"), "Bb");
  assert.equal(transposeSymbol("F/C", 2), "G/D");
  assert.equal(transposeSymbol("A7b9", 5, "flats"), "D7b9");
  assert.equal(transposeSymbol("E7b9", 1, "sharps"), "F7b9");
  assert.equal(transposeSymbol("A5", -2), "G5");
  assert.equal(transposeSymbol("Dmmaj7", 2), "Emmaj7");
  assert.throws(() => transposeSymbol("Hm", 1), /Unknown/);
});

test("normalizeSemitones maps into -5..+6", () => {
  assert.equal(normalizeSemitones(7), -5);
  assert.equal(normalizeSemitones(-6), 6);
  assert.equal(normalizeSemitones(0), 0);
  assert.equal(normalizeSemitones(6), 6);
  assert.equal(normalizeSemitones(-5), -5);
  assert.equal(normalizeSemitones(14), 2);
});

test("shiftShape turns open E into barre F and folds by octaves", () => {
  assert.deepEqual(shiftShape([0, 2, 2, 1, 0, 0], 1), [1, 3, 3, 2, 1, 1]);
  assert.deepEqual(shiftShape([3, 5, 5, 3, 3, 3], 10), [1, 3, 3, 1, 1, 1]);
  assert.deepEqual(shiftShape([-1, -1, -1, 7, 6, 5], -9), [-1, -1, -1, 10, 9, 8]);
  assert.deepEqual(shiftShape([-1, -1, -1, 4, 3, 2], 11), [-1, -1, -1, 3, 2, 1]);
  assert.deepEqual(shiftShape([-1, -1, -1, -1, -1, -1], 3), [-1, -1, -1, -1, -1, -1]);
});

test("resolveShape prefers exact entries and shifts same-quality shapes otherwise", () => {
  const em = resolveShape("Em", "b");
  assert.equal(em.source, "exact");
  assert.deepEqual(em.shape, [0, 2, 2, 0, 0, 0]);

  const fm = resolveShape("Fm", "b");
  assert.equal(fm.source, "shifted");
  assert.deepEqual(fm.shape, [1, 3, 3, 1, 1, 1]);

  const bbm = resolveShape("Bbm", "t");
  assert.equal(bbm.source, "shifted");
  assert.equal(bbm.shape.filter((f) => f >= 0).length, 3);
  assert.ok(checkShape("Bbm", bbm.shape).ok);

  assert.equal(resolveShape("Ebm9", "a").source, "exact");
  assert.equal(resolveShape("Bb", "a").source, "basic");
  assert.equal(resolveShape("C7sus4", "b"), null);
});

test("resolveShape honours slash-chord bass intervals", () => {
  const r = resolveShape("G/B", "t");
  assert.equal(r.source, "shifted");
  assert.ok(checkShape("G/B", r.shape).ok);
  assert.equal(resolveShape("G/E", "t"), null);
});

test("transposeScale moves root and fret, wrapping by octave", () => {
  const a = transposeScale({ t: "menor", r: "A", R: 5, n: "x" }, 2);
  assert.equal(a.r, "B"); assert.equal(a.R, 7); assert.equal(a.n, "x");
  const e = transposeScale({ t: "menor", r: "E", R: 12, n: "" }, 2);
  assert.equal(e.r, "F#"); assert.equal(e.R, 2);
  const c = transposeScale({ t: "menor", r: "C", R: 8, n: "" }, -3);
  assert.equal(c.r, "A"); assert.equal(c.R, 5);
  const d = transposeScale({ t: "menor", r: "D", R: 10, n: "" }, 1);
  assert.equal(d.r, "Eb"); assert.equal(d.R, 11);
  const maj = transposeScale({ t: "mayor", r: "A", R: 5, n: "" }, -4);
  assert.equal(maj.r, "F"); assert.equal(maj.R, 13);
  assert.equal(transposeScale({ t: "menor", r: "A", R: 5 }, 0).R, 5);
});

test("transposeLyricLine keeps chord columns", () => {
  assert.equal(transposeLyricLine("Am       C", 2), "Bm       D");
  assert.equal(transposeLyricLine("      E7            Am", 2), "      F#7           Bm");
  assert.equal(transposeLyricLine("A   B", 1, "flats"), "Bb  C");
  assert.equal(transposeLyricLine("A B", 1, "flats"), "Bb C");
  assert.equal(transposeLyricLine("Bb  C", -1), "A   B");
  assert.equal(transposeLyricLine("Am7  F/C | G", 2), "Bm7  G/D | A");
  assert.equal(transposeLyricLine("Am  E  Cadd", 2), "Bm  F# Cadd");
  assert.equal(transposeLyricLine("yo soy el hijo del inti sol", 2), "yo soy el hijo del inti sol");
  assert.equal(transposeLyricLine("Am   G", 0), "Am   G");
});

test("transposeLyrics applies per line", () => {
  const src = "Am       G\nyo soy el hijo\n";
  assert.equal(transposeLyrics(src, 3, "flats"), "Cm       Bb\nyo soy el hijo\n");
  assert.equal(transposeLyrics("", 3), "");
});
