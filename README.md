# Julián Carreño — Portfolio

Single-page portfolio for Julián Andrés Carreño Galvis, Senior Full Stack Developer.

## Develop

    mise install          # Node 24
    pnpm install
    pnpm dev --port 6200  # http://localhost:6200

## Edit content

All copy lives in `src/data/resume.tsx`. There is intentionally no résumé download.

- **Testimonials** — add real recommendations to `testimonials` in `src/data/resume.tsx` (quote, name, role, company, relationship). The section stays hidden while the list is empty; never add invented quotes.
- **Pictures** — `public/projects/*.webp` and `public/companies/*.webp` are screenshots of each product's public website (1440×810). Replace them with real screens of Julián's work when available and cleared with the client.

## Deploy

Live on GitHub Pages at https://super-dev813.github.io/julian-portfolio/.

To publish changes: `deploy/publish-pages.sh`. It builds a static export (`STATIC_EXPORT=1`) and
pushes it to the `gh-pages` branch, which Pages serves.

Automatic deploys on every push: move `deploy/github-pages-workflow.yml` to
`.github/workflows/deploy.yml` (pushing it needs a token with the `workflow` scope:
`gh auth refresh -s workflow`), then set repo → Settings → Pages → Source to "GitHub Actions".

A normal `pnpm build` (no `STATIC_EXPORT`) still works for Vercel or `next start`.

## Credits

Built on the [Magic UI portfolio template](https://github.com/magicuidesign/portfolio) by Dillion Verma (MIT).
