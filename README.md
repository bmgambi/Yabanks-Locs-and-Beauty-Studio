# Yabanks Locs & Beauty Studio

Single-page mobile-first landing page for Yabanks Locs & Beauty Studio in Utawala, Nairobi, built with React, TypeScript, Tailwind CSS, and Vite.

## Run locally

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
   *(Uses `--legacy-peer-deps` due to Vite 8 / esbuild peer version alignment in `package.json`.)*
2. Start the development server on `http://localhost:3000`:
   ```bash
   npm run dev
   ```
3. Build the production static bundle into `dist/`:
   ```bash
   npm run build
   ```

## Deploy to GitHub Pages

This repository includes `.github/workflows/deploy.yml`, which automatically builds `dist/` and deploys it to GitHub Pages whenever you push to `main` or `master`.

1. Push the repository to GitHub.
2. In your GitHub repository, go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions** (not *Deploy from a branch*).
3. *(Optional)* If you later add client-side Gemini features, add a `VITE_GEMINI_API_KEY` repository secret under **Settings → Secrets and variables → Actions**.
4. During GitHub Actions builds, `VITE_BASE_PATH` is automatically populated from your repository's Pages `base_path` (for example `/YOUR-REPO-NAME/`). If building manually outside GitHub Actions for a subpath, run:
   ```bash
   VITE_BASE_PATH="/YOUR-REPO-NAME/" npm run build
   ```
