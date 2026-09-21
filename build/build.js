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
import { SET } from "../src/data/setlist.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const FONTS_DIR = join(ROOT, "assets", "fonts");
const OUT_DIR = join(ROOT, "dist");
const OUT = join(OUT_DIR, "setlist-la-tribu.html");
const SONGS_DIR = join(OUT_DIR, "songs");
const SHOW_FILE = "data/show.json";

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
  "data/show.json": "SHOW",
};

// `--show` builds a second file for one specific show: src/data/show.json is
// inlined as SHOW and the UI lists only those songs, in that order. The full
// SET still travels in the file, so song ids, scales and saved transpositions
// keep working unchanged; the show only decides what the index displays.
export function parseShow(text) {
  let show;
  try { show = JSON.parse(text); } catch (e) { throw new Error("invalid JSON in " + SHOW_FILE + ": " + e.message); }
  if (!show || typeof show.name !== "string" || !show.name.trim()) throw new Error(SHOW_FILE + ' needs a non-empty "name"');
  if (!Array.isArray(show.order) || !show.order.length || !show.order.every((n) => Number.isInteger(n) && n > 0)) {
    throw new Error(SHOW_FILE + ' needs "order": a non-empty list of song numbers');
  }
  if (new Set(show.order).size !== show.order.length) throw new Error(SHOW_FILE + " repeats a song number");
  const file = typeof show.file === "string" && show.file.trim() ? show.file.trim() : "setlist-" + slug(show.name) + ".html";
  if (!/^[\w.-]+\.html$/.test(file)) throw new Error(SHOW_FILE + ': "file" must be a plain .html file name');
  return { name: show.name.trim(), order: show.order.slice(), file };
}

export function slug(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "show";
}

// `--songs` builds one file per song: NN is the song's 1-based position in the
// show (dist/songs/NN-slug.html), so the sequence matches the printed setlist.
export function songFileName(pos, title) {
  return String(pos).padStart(2, "0") + "-" + slug(title) + ".html";
}

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

// System fallbacks for the three webfonts, keyed by the exact family name used
// in styles.css.
const FONT_FALLBACKS = {
  "Archivo": '"Archivo",system-ui,sans-serif',
  "Archivo Black": '"Archivo Black",Impact,sans-serif',
  "JetBrains Mono": '"JetBrains Mono",ui-monospace,monospace',
};

// `--songs` files skip the embedded @font-face blocks (no network, but no
// vendored fonts either) so every bare `font-family:"<name>"` declaration
// needs a system fallback appended. Only touches a declaration that ends
// right after the closing quote (no fallback already there): a lookahead on
// `;` or `}` keeps the original terminator and leaves declarations that
// already carry a fallback list untouched.
export function fontFallbackCss(css) {
  return css.replace(/font-family:"(Archivo Black|Archivo|JetBrains Mono)"(?=[;}])/g, (_, name) => "font-family:" + FONT_FALLBACKS[name]);
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

// Assemble one HTML document as a string. `show` inlines SHOW.json and scopes
// the index/navigation to that show's order. `start` (a song number, matching
// s.n) inlines a `const START = <n>;` right after the other JSON constants,
// so the app boots straight into that song instead of the index. `fonts`
// picks embedded @font-face (true, the default) or system fallbacks (false,
// used by --songs so single-song files stay small).
export function buildHtml({ show = null, start = null, fonts = true } = {}) {
  // SHOW is a block-scoped const inside the IIFE, so it must be declared
  // before ui/app.js reads it: splice it in right after the other JSON data.
  const modules = show ? MODULES.flatMap((rel) => (rel === "data/transposiciones.json" ? [rel, SHOW_FILE] : [rel])) : MODULES;
  const bodies = modules.map((rel) => [rel, rel.endsWith(".json") ? wrapJson(JSON_CONST[rel] || fail("no const name for " + rel), readSrc(rel)) : stripEsm(readSrc(rel))]);
  if (start != null) {
    const idx = bodies.findIndex(([rel]) => rel === SHOW_FILE || rel === "data/transposiciones.json");
    bodies.splice(idx + 1, 0, ["START", wrapJson("START", String(start))]);
  }
  const dups = duplicateTopLevelNames(bodies);
  if (dups.length) fail("duplicate top-level names across modules: " + dups.join("; "));
  const js = bodies.map(([rel, body]) => "/* ---- src/" + rel + " ---- */\n" + body).join("\n\n");
  const wrapped = '(function(){\n"use strict";\n' + js + "\n})();\n";

  const css = fonts ? fontFaceCss() + "\n" + readSrc("styles.css") : fontFallbackCss(readSrc("styles.css"));
  const template = readSrc("template.html");
  if (!template.includes("{{css}}") || !template.includes("{{js}}")) fail("template.html must contain {{css}} and {{js}}");

  // split/join instead of replace(): the payload may contain `$&`-style patterns.
  const html = template.split("{{css}}").join(css).split("{{js}}").join(wrapped);
  if (/\{\{[a-z]+\}\}/.test(html)) fail("unreplaced placeholder left in output");
  if (/^\s*(import|export)\s/m.test(wrapped)) fail("import/export survived stripping");
  return html;
}

export function main(argv = process.argv.slice(2)) {
  const withShow = argv.includes("--show");
  const withSongs = argv.includes("--songs");
  const show = (withShow || withSongs) ? parseShow(readSrc(SHOW_FILE)) : null;
  mkdirSync(OUT_DIR, { recursive: true });

  // `--song <n>` builds one font-less file for a single song by its number
  // (s.n), independent of any show: dist/songs/<slug>.html. This is how a
  // song outside the current show gets its own page for embedding elsewhere.
  const songFlag = argv.indexOf("--song");
  if (songFlag >= 0) {
    const n = parseInt(argv[songFlag + 1], 10);
    const song = SET.find((s) => s.n === n);
    if (!song) fail("--song needs a song number that exists in the setlist (got " + argv[songFlag + 1] + ")");
    mkdirSync(SONGS_DIR, { recursive: true });
    const html = buildHtml({ start: n, fonts: false });
    const name = slug(song.t) + ".html";
    writeFileSync(join(SONGS_DIR, name), html);
    console.log("build: wrote dist/songs/" + name + " (" + (Buffer.byteLength(html) / 1024).toFixed(1) + " KB) · song " + n + " " + song.t);
    return;
  }

  if (withSongs) {
    mkdirSync(SONGS_DIR, { recursive: true });
    let totalKb = 0;
    show.order.forEach((n, i) => {
      const pos = i + 1;
      const song = SET.find((s) => s.n === n);
      if (!song) fail(SHOW_FILE + " lists song " + n + ", not found in the setlist");
      const html = buildHtml({ show, start: n, fonts: false });
      const name = songFileName(pos, song.t);
      writeFileSync(join(SONGS_DIR, name), html);
      const kb = Buffer.byteLength(html) / 1024;
      totalKb += kb;
      console.log("build: wrote dist/songs/" + name + " (" + kb.toFixed(1) + " KB)");
    });
    console.log("build: wrote " + show.order.length + " song files to dist/songs/ (" + totalKb.toFixed(1) + " KB total)");
    return;
  }

  const html = buildHtml({ show, fonts: true });
  const out = show ? join(OUT_DIR, show.file) : OUT;
  writeFileSync(out, html);
  console.log("build: wrote dist/" + (show ? show.file : "setlist-la-tribu.html") + " (" + (Buffer.byteLength(html) / 1024).toFixed(1) + " KB)"
    + (show ? ' · show "' + show.name + '", ' + show.order.length + " songs" : ""));
}

// Only build when executed directly, so tests can import stripEsm.
if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
