import { test } from "node:test";
import assert from "node:assert/strict";
import { stripEsm, wrapJson, duplicateTopLevelNames, parseShow, slug, songFileName, fontFallbackCss } from "../build/build.js";

test("stripEsm removes single-line imports", () => {
  const src = 'import { a } from "./a.js";\nconst x = 1;\n';
  assert.equal(stripEsm(src), "const x = 1;\n");
});

test("stripEsm removes multi-line imports", () => {
  const src = 'import {\n  a,\n  b,\n} from "./ab.js";\nlet y = 2;\n';
  assert.equal(stripEsm(src), "let y = 2;\n");
});

test("stripEsm unwraps exported declarations", () => {
  const src = "export const A = 1;\nexport function f(){}\nexport class K {}\n";
  assert.equal(stripEsm(src), "const A = 1;\nfunction f(){}\nclass K {}\n");
});

test("stripEsm drops re-export lists and keeps everything else", () => {
  const src = "const a = 1;\nexport { a, b };\n// export in a comment stays\n";
  assert.equal(stripEsm(src), "const a = 1;\n// export in a comment stays\n");
});

test("wrapJson inlines a JSON file as a script constant", () => {
  assert.equal(wrapJson("X", '{ "songs": { "2": 2 } }\n'), 'const X = {"songs":{"2":2}};');
  assert.throws(() => wrapJson("X", "{ nope }"), /invalid JSON/);
});

test("duplicateTopLevelNames finds names declared by two modules", () => {
  const bodies = [["a.js", "const x = 1;\nfunction f(){}\n"], ["b.js", "  const x = 2;\nconst x = 3;\nclass f {}\n"]];
  assert.deepEqual(duplicateTopLevelNames(bodies), ["x (a.js, b.js)", "f (a.js, b.js)"]);
  assert.deepEqual(duplicateTopLevelNames([["a.js", "const y = 1;"]]), []);
});

test("parseShow accepts a named, ordered, duplicate-free song list", () => {
  assert.deepEqual(parseShow('{ "name": "Festitook", "order": [11, 1, 2] }'),
    { name: "Festitook", order: [11, 1, 2], file: "setlist-festitook.html" });
  assert.equal(parseShow('{ "name": "X", "file": "show.html", "order": [1] }').file, "show.html");
});

test("parseShow rejects malformed shows", () => {
  assert.throws(() => parseShow("{ nope }"), /invalid JSON/);
  assert.throws(() => parseShow('{ "order": [1] }'), /"name"/);
  assert.throws(() => parseShow('{ "name": "X", "order": [] }'), /"order"/);
  assert.throws(() => parseShow('{ "name": "X", "order": [1, "2"] }'), /"order"/);
  assert.throws(() => parseShow('{ "name": "X", "order": [1, 1] }'), /repeats/);
  assert.throws(() => parseShow('{ "name": "X", "file": "../x.html", "order": [1] }'), /"file"/);
});

test("slug strips accents and punctuation for the output file name", () => {
  assert.equal(slug("Festitook 2026 · Peña"), "festitook-2026-pena");
  assert.equal(slug("¡¡¡"), "show");
});

test("songFileName pads the position and slugs the title", () => {
  assert.equal(songFileName(2, "Loca"), "02-loca.html");
  assert.equal(songFileName(11, "El Cóndor Pasa"), "11-el-condor-pasa.html");
  assert.equal(songFileName(1, "El Acuartillado"), "01-el-acuartillado.html");
});

test("fontFallbackCss appends system fallbacks to bare font-family declarations", () => {
  assert.equal(
    fontFallbackCss('h1{font-family:"Archivo Black";margin:0}'),
    'h1{font-family:"Archivo Black",Impact,sans-serif;margin:0}',
  );
  assert.equal(
    fontFallbackCss('.a{font-family:"Archivo";font-size:13px}'),
    '.a{font-family:"Archivo",system-ui,sans-serif;font-size:13px}',
  );
  assert.equal(
    fontFallbackCss('.b{font-family:"JetBrains Mono";font-size:13px}'),
    '.b{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:13px}',
  );
});

test("fontFallbackCss leaves declarations that already carry a fallback untouched", () => {
  const css = 'body{font-family:"Archivo",system-ui,-apple-system,sans-serif}.letra{font-family:"JetBrains Mono",monospace;font-size:1em}';
  assert.equal(fontFallbackCss(css), css);
});

test("fontFallbackCss handles the `}` terminator", () => {
  assert.equal(
    fontFallbackCss('.x{color:red;font-family:"Archivo"}'),
    '.x{color:red;font-family:"Archivo",system-ui,sans-serif}',
  );
});
