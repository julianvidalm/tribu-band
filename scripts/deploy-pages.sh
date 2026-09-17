#!/usr/bin/env bash
# Publish the built setlists to GitHub Pages (branch gh-pages of origin).
#
# The gh-pages branch holds only build output, never source: index.html is the
# current show (dist/setlist-festitook.html), setlist-la-tribu.html the full
# set. It is rebuilt from scratch on every deploy, so its history is disposable.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

npm run build --silent
npm run build:show --silent

SHOW_FILE="$(node -e 'const s=require("./src/data/show.json");process.stdout.write(s.file||"")')"
[ -n "$SHOW_FILE" ] || { echo "deploy: src/data/show.json has no file name" >&2; exit 1; }

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
cp "dist/$SHOW_FILE" "$WORK/index.html"
cp "dist/$SHOW_FILE" "$WORK/$SHOW_FILE"
cp dist/setlist-la-tribu.html "$WORK/setlist-la-tribu.html"
touch "$WORK/.nojekyll"

REMOTE="$(git remote get-url origin)"
MSG="${1:-deploy: $(date +%Y-%m-%d) $SHOW_FILE}"
(
  cd "$WORK"
  git init -q -b gh-pages
  git add -A
  git commit -q -m "$MSG"
  git push -q --force "$REMOTE" gh-pages
)
echo "deploy: pushed gh-pages -> https://$(git remote get-url origin | sed -E 's#.*github.com[:/]([^/]+)/([^/.]+)(\.git)?#\1.github.io/\2#')/"
