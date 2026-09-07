import { test } from "node:test";
import assert from "node:assert/strict";
import { stripEsm } from "../build/build.js";

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
