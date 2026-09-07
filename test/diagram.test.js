import { test } from "node:test";
import assert from "node:assert/strict";
import { baseFret } from "../src/lib/diagram.js";

test("baseFret shows the nut for open-position shapes", () => {
  assert.equal(baseFret([-1, 0, 2, 2, 1, 0]), 1);
  assert.equal(baseFret([3, 2, 0, 0, 3, 3]), 1);
});

test("baseFret starts at the lowest fret when the shape exceeds five frets", () => {
  assert.equal(baseFret([-1, -1, 5, 7, 7, 7]), 5);
  assert.equal(baseFret([-1, -1, 8, 10, 10, 10]), 8);
});

test("baseFret starts at the lowest fret for closed shapes at fret 3 or higher", () => {
  assert.equal(baseFret([-1, 3, 5, 5, 4, 3]), 3);
  assert.equal(baseFret([-1, -1, -1, 4, 3, 4]), 3);
});

test("baseFret keeps the nut when an open string is involved", () => {
  assert.equal(baseFret([-1, 0, 5, 5, 5, -1]), 1);
});

test("baseFret keeps the nut for closed shapes below fret 3", () => {
  assert.equal(baseFret([-1, -1, -1, 2, 2, 2]), 1);
  assert.equal(baseFret([-1, 2, 4, 2, 3, -1]), 1);
});
