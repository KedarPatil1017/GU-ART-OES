# GU-ART Mock Exam System — PWA

This repository contains the existing GU-ART Mock Exam System packaged as an installable Progressive Web App (PWA).

## Publish on GitHub Pages

1. Create a new **public** GitHub repository, for example `gu-art-mock-exam`.
2. Upload **all files and folders** from this package. `index.html` must be in the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose branch `main` and folder `/(root)`, then save.
6. Wait for GitHub Pages to publish the site. Open the URL GitHub provides.

GitHub Pages serves over HTTPS, which is required for service workers and PWA installation.

## Install

- **Android / Chrome:** open the published URL, then use the browser menu → **Install app** or **Add to Home screen**.
- **Desktop Chrome / Edge:** open the published URL and use the install icon in the address bar or the browser menu.
- **iPhone / iPad:** open the URL in Safari → Share → **Add to Home Screen**.

## Offline behaviour and data

- The app shell is cached by the service worker so the site can open after it has been loaded online once.
- The app's existing browser-local data model is unchanged. Questions, users, and results stored in `localStorage` remain on that browser/device; they are **not synced** between devices or users.
- Do not clear browser site data unless you have exported a backup from the app first.
- After publishing an update, browsers may need to reopen the app once online to receive the new version.

## Files

- `index.html` — the app
- `manifest.webmanifest` — PWA name, display mode, colours, and icons
- `sw.js` — offline app-shell cache
- `icons/` — install icons


## Project-site path configuration

This build is configured specifically for `https://kedarpatil1017.github.io/GU-ART-OES/` using absolute manifest, icon, and service-worker paths.
