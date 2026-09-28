#!/usr/bin/env bash
# Build the static export and publish it to the gh-pages branch (GitHub Pages "deploy from branch").
# Usage: deploy/publish-pages.sh   (run from the repo root, Node 24 active)
set -euo pipefail

REPO_URL="$(git remote get-url origin)"
SITE_URL="https://super-dev813.github.io/julian-portfolio"
BASE_PATH="/julian-portfolio"

rm -rf out
STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH="$BASE_PATH" NEXT_PUBLIC_SITE_URL="$SITE_URL" pnpm build
touch out/.nojekyll # otherwise Pages' Jekyll step drops the _next/ folder

cd out
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C .. config user.name)" -c user.email="$(git -C .. config user.email)" \
  commit -q -m "deploy: $(git -C .. rev-parse --short HEAD)"
git push -q -f "$REPO_URL" gh-pages
echo "Published $(git -C .. rev-parse --short HEAD) to $SITE_URL/"
