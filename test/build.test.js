import { test } from "node:test";
import assert from "node:assert/strict";
import { stripEsm, wrapJson, duplicateTopLevelNames, parseShow, slug } from "../build/build.js";

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
