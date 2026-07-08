# GitHub Pages Legacy Redirect Repository

This repository (and its `main` branch) exists **ONLY** for redirecting legacy traffic from `https://helloyug.github.io` to the new custom domain `https://yugagarwal.dev`.

## Deployment Architecture

- **Production Deployment:** The actual portfolio source code lives in a separate project and is deployed to **Netlify** (`https://yugagarwal.dev`).
- **Legacy Redirect:** This repository is deployed via **GitHub Pages** (`https://helloyug.github.io`).

## How it works
- `index.html`: Handles redirects for users visiting the root URL.
- `404.html`: Acts as a wildcard/catch-all router for GitHub Pages. Any deep link (such as `/yug-agarwal-software-engineer-resume`) will hit this file, which dynamically parses the requested path, search queries, and hash symbols, and redirects the user to the exact same destination on `yugagarwal.dev`.
- `.nojekyll`: Ensures GitHub Pages does not try to process the site using Jekyll, serving files exactly as they are.

**CRITICAL:** Do NOT modify these files unless you are updating the redirect destination. This setup ensures a seamless SEO transition and unbroken links for legacy visitors.
