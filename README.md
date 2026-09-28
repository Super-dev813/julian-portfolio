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

Deployed on Vercel (Hobby). Every push to `main` redeploys. The canonical URL comes from
`NEXT_PUBLIC_SITE_URL` when set, otherwise Vercel's production domain. Custom domain: add it under
Project → Settings → Domains and follow the DNS records Vercel shows.

## Credits

Built on the [Magic UI portfolio template](https://github.com/magicuidesign/portfolio) by Dillion Verma (MIT).
