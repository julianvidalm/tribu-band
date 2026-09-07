import { test } from "node:test";
import assert from "node:assert/strict";
import { isChordLine, letraHTML } from "../src/lib/lyrics.js";

test("isChordLine recognises chord-only lines", () => {
  assert.equal(isChordLine("C           G"), true);
  assert.equal(isChordLine("Am7  F/C | G"), true);
  assert.equal(isChordLine("   Dm   A7"), true);
});

test("isChordLine rejects lyric text", () => {
  assert.equal(isChordLine("Loca, loca, loca"), false);
  assert.equal(isChordLine("Me contaron los abuelos"), false);
  assert.equal(isChordLine("C hasta el final"), false);
});

test("letraHTML paints chord lines and lyric lines differently", () => {
  const html = letraHTML("C     G\nPrimera linea");
  const lines = html.split("\n");
  assert.equal(lines[0], '<span class="ac">C     G</span>');
  assert.equal(lines[1], '<span class="lt">Primera linea</span>');
});

test("letraHTML escapes html and keeps blank lines", () => {
  const html = letraHTML("a < b\n\nC");
  const lines = html.split("\n");
  assert.equal(lines[0], '<span class="lt">a &lt; b</span>');
  assert.equal(lines[1], '<span class="lt"> </span>');
  assert.equal(lines[2], '<span class="ac">C</span>');
});

test("letraHTML returns an empty string for empty input", () => {
  assert.equal(letraHTML(""), "");
  assert.equal(letraHTML(undefined), "");
});
