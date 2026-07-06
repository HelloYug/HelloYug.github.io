# GitHub Pages Redirect Branch

This branch exists **ONLY** for redirecting legacy traffic from `https://helloyug.github.io` to the new custom domain `https://yugagarwal.dev`.

## Deployment Architecture

- **Production Source Code:** Lives in the `main` branch.
- **Production Deployment:** The `main` branch is deployed to **Netlify** (`https://yugagarwal.dev`).
- **Legacy Redirect:** This `redirect` branch is deployed to **GitHub Pages** (`https://helloyug.github.io`).

**CRITICAL:** Do NOT merge this branch into `main`. Do NOT delete this branch.
