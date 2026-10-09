# Helios marketing website

The marketing site for the Helios FHIR Server, built with [Astro](https://astro.build).
It builds to plain static HTML in `dist/`.

## Local development

Requires Node.js 22 or newer.

```bash
cd website
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs static files to dist/
npm run preview   # serves the built site locally
```

## Project layout

```
website/
├── public/            # Static files served as-is (logo, favicon)
└── src/
    ├── layouts/       # Shared page shell (<head>, global styles)
    └── pages/         # Each .astro file here becomes a route
```

## Deploying to Vercel

1. Import the repository in Vercel.
2. Set **Root Directory** to `website`.
3. Vercel detects Astro automatically. No other settings are needed.

Every pull request gets a preview URL, and merges to `main` deploy to production.
