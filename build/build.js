// Build: inline src/ into one offline HTML file.
//
// This is deliberately a dumb concatenator, not a bundler. The source files use
// ESM import/export so Node can load them natively for tests and validation,
// but the browser output must be a single <script> that works from the iPad
// Files app with no server and no network. Inline <script type="module"> tags
// cannot import each other, so concatenation is required anyway. Stripping the
// import/export keywords and joining the files in a fixed dependency order gives
// a single classic script with zero dependencies, which is what keeps this
// buildable years from now with nothing but Node.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const FONTS_DIR = join(ROOT, "assets", "fonts");
const OUT_DIR = join(ROOT, "dist");
const OUT = join(OUT_DIR, "setlist-la-tribu.html");

// Webfonts are vendored (latin subsets from Google Fonts) and embedded as
// base64 so the page renders identically with no network. Archivo and
// JetBrains Mono are variable fonts: one file covers every weight in range.
const FONTS = [
  { family: "Archivo", weight: "100 900", file: "archivo-latin.woff2" },
  { family: "Archivo Black", weight: "400", file: "archivo-black-latin.woff2" },
  { family: "JetBrains Mono", weight: "100 800", file: "jetbrains-mono-latin.woff2" },
];

// Dependency order: data first, then libs, then the UI that wires them.
const MODULES = [
  "data/chords.js",
  "data/setlist.js",
  "data/scales.js",
  "data/transposiciones.json",
  "lib/notation.js",
  "lib/bars.js",
  "lib/theory.js",
  "lib/diagram.js",
  "lib/scale.js",
  "lib/lyrics.js",
  "lib/transpose.js",
  "ui/app.js",
];

// JSON data files are inlined as a const with this name.
const JSON_CONST = {
  "data/transposiciones.json": "TRANSPOSICIONES",
};

// Turn a JSON file into a script-level constant: `const NAME = {...};`
export function wrapJson(name, text) {
  let value;
  try { value = JSON.parse(text); } catch (e) { throw new Error("invalid JSON for " + name + ": " + e.message); }
  return "const " + name + " = " + JSON.stringify(value) + ";";
}

function fail(msg) {
  console.error("build: " + msg);
  process.exit(1);
}

// Turn an ESM module into plain script text:
// - drop import statements (single or multi-line, ending in `from "...";`)
// - drop `export { ... };` re-export lines
// - keep declarations, minus the `export ` prefix
export function stripEsm(code) {
  const out = [];
  let inImport = false;
  for (const line of code.split("\n")) {
    if (inImport) {
      if (/from\s+["'][^"']+["'];?\s*$/.test(line)) inImport = false;
      continue;
    }
    if (/^\s*import\s/.test(line)) {
      if (!/from\s+["'][^"']+["'];?\s*$/.test(line) && !/^\s*import\s+["']/.test(line)) inImport = true;
      continue;
    }
    if (/^\s*export\s*\{[^}]*\}\s*;?\s*$/.test(line)) continue;
    out.push(line.replace(/^(\s*)export\s+(const|let|var|function|class|async function)\b/, "$1$2"));
  }
  return out.join("\n");
}

function readSrc(rel) {
  const p = join(SRC, rel);
  if (!existsSync(p)) fail("missing module " + rel);
  return readFileSync(p, "utf8");
}

export function fontFaceCss() {
  return FONTS.map((f) => {
    const p = join(FONTS_DIR, f.file);
    if (!existsSync(p)) fail("missing font " + f.file);
    const b64 = readFileSync(p).toString("base64");
    return '@font-face{font-family:"' + f.family + '";font-style:normal;font-weight:' + f.weight +
      ';font-display:block;src:url(data:font/woff2;base64,' + b64 + ') format("woff2")}';
  }).join("\n");
}

// Every module shares one scope after concatenation, so two modules declaring
// the same top-level name would be a silent bug or a SyntaxError in the browser.
export function duplicateTopLevelNames(bodies) {
  const seen = new Map(), dups = [];
  for (const [rel, body] of bodies) {
    for (const m of body.matchAll(/^(?:const|let|var|function|class|async function)\s+([A-Za-z_$][\w$]*)/gm)) {
      if (seen.has(m[1])) dups.push(m[1] + " (" + seen.get(m[1]) + ", " + rel + ")");
      else seen.set(m[1], rel);
    }
  }
  return dups;
}

export function main() {
  const bodies = MODULES.map((rel) => [rel, rel.endsWith(".json") ? wrapJson(JSON_CONST[rel] || fail("no const name for " + rel), readSrc(rel)) : stripEsm(readSrc(rel))]);
  const dups = duplicateTopLevelNames(bodies);
  if (dups.length) fail("duplicate top-level names across modules: " + dups.join("; "));
  const js = bodies.map(([rel, body]) => "/* ---- src/" + rel + " ---- */\n" + body).join("\n\n");
  const wrapped = '(function(){\n"use strict";\n' + js + "\n})();\n";

  const css = fontFaceCss() + "\n" + readSrc("styles.css");
  const template = readSrc("template.html");
  if (!template.includes("{{css}}") || !template.includes("{{js}}")) fail("template.html must contain {{css}} and {{js}}");

  // split/join instead of replace(): the payload may contain `$&`-style patterns.
  const html = template.split("{{css}}").join(css).split("{{js}}").join(wrapped);
  if (/\{\{[a-z]+\}\}/.test(html)) fail("unreplaced placeholder left in output");
  if (/^\s*(import|export)\s/m.test(wrapped)) fail("import/export survived stripping");

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT, html);
  console.log("build: wrote dist/setlist-la-tribu.html (" + (Buffer.byteLength(html) / 1024).toFixed(1) + " KB)");
}

// Only build when executed directly, so tests can import stripEsm.
if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
