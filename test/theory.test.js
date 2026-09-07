import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseNote, noteName, shapeNotes, shapeBass, parseChord, requiredNotes,
  checkShape, keyScale, outOfKey,
} from "../src/lib/theory.js";

const N = (...names) => names.map(parseNote).sort((a, b) => a - b);
const ivs = (symbol) => [...parseChord(symbol).intervals].sort((a, b) => a - b);

test("parseNote handles naturals, sharps and flats", () => {
  assert.equal(parseNote("C"), 0);
  assert.equal(parseNote("Bb"), 10);
  assert.equal(parseNote("A#"), 10);
  assert.equal(parseNote("Cb"), 11);
  assert.throws(() => parseNote("H"), /Unknown note/);
});

test("noteName spells sharps by default and flats on request", () => {
  assert.equal(noteName(10), "A#");
  assert.equal(noteName(10, { flats: true }), "Bb");
  assert.equal(noteName(12), "C");
});

test("parseChord intervals for every supported quality", () => {
  const cases = {
    "C": [0, 4, 7], "Cmaj": [0, 4, 7], "Cm": [0, 3, 7], "Cmin": [0, 3, 7],
    "C5": [0, 7], "Cdim": [0, 3, 6], "Caug": [0, 4, 8],
    "Csus2": [0, 2, 7], "Csus4": [0, 5, 7], "Csus": [0, 5, 7],
    "C7": [0, 4, 7, 10], "Cmaj7": [0, 4, 7, 11], "Cm7": [0, 3, 7, 10], "Cmmaj7": [0, 3, 7, 11],
    "Cdim7": [0, 3, 6, 9], "Cm7b5": [0, 3, 6, 10],
    "C9": [0, 2, 4, 7, 10], "Cmaj9": [0, 2, 4, 7, 11], "Cm9": [0, 2, 3, 7, 10],
    "C11": [0, 2, 4, 5, 7, 10], "C13": [0, 2, 4, 7, 9, 10],
    "C6": [0, 4, 7, 9], "Cm6": [0, 3, 7, 9], "C6/9": [0, 2, 4, 7, 9],
    "Cadd9": [0, 2, 4, 7], "C7b9": [0, 1, 4, 7, 10], "C7#9": [0, 3, 4, 7, 10],
    "C7sus4": [0, 5, 7, 10],
  };
  for (const [symbol, expected] of Object.entries(cases)) {
    assert.deepEqual(ivs(symbol), expected, symbol);
  }
});

test("parseChord reads root, quality and slash bass", () => {
  const c = parseChord("Am7/G");
  assert.equal(c.root, 9);
  assert.equal(c.quality, "m7");
  assert.equal(c.bass, 7);
  assert.equal(parseChord("F/C").bass, 0);
  assert.equal(parseChord("Bb7").root, 10);
  assert.equal(parseChord("E6/9").bass, null, "6/9 is a quality, not a slash bass");
});

test("parseChord rejects unknown symbols", () => {
  assert.throws(() => parseChord("Cxyz"), /Unknown chord symbol: Cxyz/);
  assert.throws(() => parseChord("H7"), /Unknown chord symbol/);
  assert.throws(() => parseChord(""), /Unknown chord symbol/);
});

test("required and optional intervals follow the omission policy", () => {
  const triad = parseChord("C");
  assert.deepEqual(triad.required.sort(), [0, 4]);
  assert.deepEqual(triad.optional, [7]);

  const seventh = parseChord("Am7");
  assert.deepEqual(seventh.required.sort((a, b) => a - b), [3, 10], "3rd and 7th define the chord");
  assert.deepEqual(seventh.optional.sort((a, b) => a - b), [0, 7], "root and 5th may be left to the bass");

  const power = parseChord("A5");
  assert.deepEqual(power.required.sort(), [0, 7]);
  assert.deepEqual(power.optional, []);

  const thirteen = parseChord("G13");
  assert.ok(!thirteen.required.includes(2), "9th is optional in 13 chords");
  assert.ok(thirteen.required.includes(9), "13th is required");

  const add9 = parseChord("Cadd9");
  assert.ok(add9.required.includes(2), "add9 requires the 9th");
  const sus = parseChord("Dsus4");
  assert.ok(sus.required.includes(5), "suspended 4th replaces the 3rd");
});

test("requiredNotes drops the root in voicings of four strings or fewer", () => {
  const c = parseChord("C");
  assert.deepEqual(requiredNotes(c, [-1, 3, 2, 0, 1, 0]).sort(), N("C", "E"));
  assert.deepEqual(requiredNotes(c, [-1, -1, -1, 5, 5, 3]).sort(), N("E"));
});

test("shapeNotes and shapeBass", () => {
  assert.deepEqual(shapeNotes([5, -1, 5, 5, 5, -1]), N("A", "C", "E", "G"));
  assert.deepEqual(shapeNotes([-1, 0, 2, 2, 1, 0]), N("A", "C", "E"));
  assert.deepEqual(shapeNotes([-1, -1, -1, -1, -1, -1]), []);
  assert.equal(shapeBass([-1, 0, 2, 2, 1, 0]), parseNote("A"));
  assert.equal(shapeBass([-1, -1, -1, 5, 6, 5]), parseNote("C"));
  assert.equal(shapeBass([-1, -1, -1, -1, -1, -1]), null);
});

test("checkShape accepts correct voicings", () => {
  assert.deepEqual(checkShape("Am7", [5, -1, 5, 5, 5, -1]), { ok: true, missing: [], extra: [], bassError: null });
  assert.equal(checkShape("F/C", [-1, -1, -1, 5, 6, 5]).ok, true);
  assert.equal(checkShape("G7", [-1, -1, -1, 4, 3, 1]).ok, true, "rootless G7 on three strings");
  assert.equal(checkShape("A7b9", [-1, -1, 5, 6, 5, 6]).ok, true, "rootless dominant with b9");
  assert.equal(checkShape("A5", [-1, 0, 2, 2, -1, -1]).ok, true);
});

test("checkShape reports a missing 3rd", () => {
  const r = checkShape("Gmaj9", [-1, -1, 5, 7, 7, 5]);
  assert.equal(r.ok, false);
  assert.deepEqual(r.missing, ["B"]);
  assert.deepEqual(r.extra, []);
});

test("checkShape reports a missing 7th", () => {
  const r = checkShape("Am7", [-1, 0, 2, 2, 1, 0]);
  assert.equal(r.ok, false);
  assert.deepEqual(r.missing, ["G"]);
});

test("checkShape flags a 3rd inside a power chord as extra", () => {
  const r = checkShape("A5", [-1, 0, 2, 2, 2, 0]);
  assert.equal(r.ok, false);
  assert.deepEqual(r.extra, ["C#"]);
});

test("checkShape flags a wrong slash bass", () => {
  const r = checkShape("F/C", [1, 3, 3, 2, 1, 1]);
  assert.equal(r.ok, false);
  assert.equal(r.bassError, "bass is F, expected C");
});

test("checkShape spells extras with flats when the root is flat", () => {
  const r = checkShape("Bb", [-1, 1, 3, 3, 3, 2]);
  assert.deepEqual(r.extra, ["Gb"]);
});

test("keyScale parses major, minor, compound and unknown keys", () => {
  const am = keyScale("Am");
  assert.equal(am.mode, "minor");
  assert.deepEqual([...am.pcs].sort((a, b) => a - b), N("A", "B", "C", "D", "E", "F", "G"));
  const c = keyScale("C / Am");
  assert.equal(c.mode, "major");
  assert.equal(c.root, 0);
  assert.equal(keyScale("?"), null);
  assert.equal(keyScale(""), null);
  assert.equal(keyScale("Dm").flats, true);
});

test("outOfKey lists chromatic notes of a voicing", () => {
  const am = keyScale("Am");
  assert.deepEqual(outOfKey("E7", [0, 2, 0, 1, 0, 0], am), ["G#"]);
  assert.deepEqual(outOfKey("Am", [-1, 0, 2, 2, 1, 0], am), []);
  const dm = keyScale("Dm");
  assert.deepEqual(outOfKey("A7", [-1, 0, 2, 0, 2, 0], dm), ["C#"], "leading tone spelled sharp in a flat minor key");
  assert.deepEqual(outOfKey("Bb7", [-1, 1, 3, 1, 3, 1], dm), ["Ab"], "other chromatics keep the key's flats");
});
