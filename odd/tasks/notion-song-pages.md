# notion-song-pages

## Objective
Personal study database in Notion ("Project Music" page) with one page per song, each embedding the song's HTML (lyrics, chords, diagrams, scale) as rendered by the setlist app.

## Problem / why
The GitHub Pages build is for the band and live playing. The user wants a personal, filterable study reference (by instrument, key, scale) that opens into the full song view only on demand.

## Scope
- Repo: `npm run build:songs` generates one font-less HTML per song of the show, opening directly on that song (dist/songs/NN-slug.html). Tests and README updated.
- Notion: database "Canciones" under Project Music with columns Título, Artista, Instrumento (multi-select), Tono, Escala, Estilo, BPM, Estado, Proyecto. 14 pages (Festitook show), each with the HTML embedded and a link to Pages.
- Out of scope: setlist position column (dropped by user), songs outside the show (added later as they are studied).

## Constraints
- Notion inline attachment limit 200 KiB: font-less build (~105 KB) only.
- Notion sandbox: localStorage and wake lock may not work; app tolerates both.
- Conventional commits, no AI attribution. TDD off (no project config); checks: `npm test`, `npm run check`, builds.

## Tasks
- [x] T1 build: `--songs` mode in build/build.js (per-song output, START constant, no embedded fonts + system fallbacks); app.js opens `START` song at boot; package.json script; tests; README. Evidence: commit 620f997 on feat/notion-song-pages; `npm test` 52/52; `npm run build:songs` wrote 14 files (~106 KB each, no @font-face, `const START = n`).
- [x] T2 Notion database "Canciones" created under Project Music with the agreed schema. Evidence: database https://app.notion.com/p/44e74c36a5c84386af4fcf2c355c2502, data source collection://4969a848-a242-4bb9-a6b0-074d3137f258 (created 2026-09-21).
- [x] T3 Row data extracted from the repo for the 14 show songs (title, artist, key, scale name, style, bpm, status). Evidence: node script over src/data/{setlist,scales,show}.js → 14 rows; Estilo mapped to the select options (Cóndor→Andino, Selva→Chicha, Gimme/Yo Tomo→Rock, Chichera→Huayno, Moliendo→Joropo, Guaneña→Bambuco, rest by genre).
- [x] T4 14 HTML files uploaded and 14 pages created with `<embed>` + Pages link. Evidence: 14 uploads HTTP 200 status "uploaded" via create-file-upload + curl; create-pages returned 14 page ids under collection 4969a848-a242-4bb9-a6b0-074d3137f258 (2026-09-21).
- [x] T5 Verification: builds/tests green; page "Loca" fetched back shows the callout, the `<embed>` bound to attachment 02-loca.html and the Pages link; user confirmed on 2026-09-21 that everything renders correctly in Notion. Branch fast-forwarded into main and pushed (5142d48).

## Acceptance criteria
- `npm run build:songs` writes 14 files, each < 200 KiB, each with `const START = <n>` and no `@font-face`.
- Notion query returns 14 rows with Instrumento = Guitarra, Requinto and an embedded HTML per page.

## Progress / evidence
- Branch: feat/notion-song-pages (from main at 3fdfc24).

## Next step
Feature closed. New songs are added on request with `node build/build.js --song <n>` plus the Notion upload/create flow (see the project memory «notion-song-pages-procedure»).
