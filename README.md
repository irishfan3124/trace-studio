# Trace Studio

A mobile-friendly camera tracing webapp for iPhone and Android. Upload an image, place it over the live rear-camera view, and trace on paper while looking at your screen.

[Open the live app](https://irishfan3124.github.io/trace-studio/)

The app is publicly hosted on GitHub Pages over HTTPS.

## Features

- Local image upload and outline extraction; images are not uploaded to a server.
- Original-image and outline modes, opacity, detail, and line color controls.
- Drag and pinch positioning, size, rotation, flip, and alignment grid.
- Lockable artwork, camera permission handling, and optional screen wake lock.
- Searchable library of 162 original line drawings across nine categories, including Spooky & Horror.

## Run locally

No build step or dependencies are needed. With Python installed, run:

```sh
python -m http.server 8000 --directory dist
```

Open http://localhost:8000 on the same computer. To use a phone camera remotely, serve `dist/` through an HTTPS static host. Plain HTTP over a LAN generally does not allow camera access. Uploading source to GitHub alone does not host the app.

## Use on a phone

1. Open the live HTTPS page in Safari on iPhone or Chrome on Android.
2. Secure the phone on a stand above paper, rear camera facing down.
3. Choose **Browse drawings** or upload artwork, then enable camera permission.
4. Adjust the overlay and lock its position, then trace while looking at the screen.

This is a screen overlay, not a physical light projector or world-anchored AR. Keep the phone and paper still. Fullscreen and wake-lock support depend on the browser.

## Publish updates to GitHub Pages

Pages serves the root of the `gh-pages` branch. After committing changes on `main`, publish the `dist/` folder with:

```sh
git push github main
git subtree split --prefix dist -b pages-update
git push github pages-update:gh-pages
git branch -D pages-update
```

If you cloned the repository from GitHub, use `origin` instead of `github` in these commands.

## Source and checks

The complete app is in `dist/`, including the line drawing catalog in `dist/drawings.js`. `.openai/hosting.json` identifies the existing Sites deployment. Google Fonts are loaded for typography, and artwork processing stays in the browser.

```sh
node --check dist/app.js
node smoke-test.cjs
```

The smoke test checks control interactions using a simulated DOM. Physical iOS/Android camera behavior and visual browser QA remain unverified.
