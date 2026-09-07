import { test } from "node:test";
import assert from "node:assert/strict";
import { stripEsm, wrapJson, duplicateTopLevelNames } from "../build/build.js";

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
