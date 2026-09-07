import { test } from "node:test";
import assert from "node:assert/strict";
import { splitBars } from "../src/lib/bars.js";

test("splitBars separates bars on | and chords on whitespace", () => {
  assert.deepEqual(splitBars("G  Am | C"), [["G", "Am"], ["C"]]);
  assert.deepEqual(splitBars("Dm  Dmmaj7 | Dm7  Dm6 | Gm | A7"), [["Dm", "Dmmaj7"], ["Dm7", "Dm6"], ["Gm"], ["A7"]]);
});

test("splitBars on empty input yields one empty bar", () => {
  assert.deepEqual(splitBars(""), [[]]);
  assert.deepEqual(splitBars(undefined), [[]]);
});
