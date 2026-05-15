# Lee Chung-woo Homepage

Personal research homepage for Lee Chung-woo, built with Next.js, Chakra UI,
Framer Motion, and Three.js.

## Overview

The site is a CV-style research portfolio with:

- Responsive dark/light theme
- CV-inspired hero, news, publications, projects, timeline, and contact sections
- Interactive Three.js profile demo
- Publications and posts pages
- Static export support for GitHub Pages-style hosting

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run lint
npm run build
```

This project uses `output: 'export'` in `next.config.js`, so production output
is generated under `out/`.

## Project Structure

```text
components/          Shared UI, layout, theme controls, and 3D scene wrappers
components/layouts/  Page shell and animated article layout
lib/                 Chakra theme and model loading utilities
pages/               Next.js routes
public/              Static assets, images, PDFs, GLB models, and ksplat scenes
```

## Content

Main homepage content is managed in `pages/index.js`.

Key static assets:

- `public/images/chungwoo.jpg`
- `public/images/preview.png`
- `public/research_summary.pdf`
- `public/iron_man_best.ksplat`

## Notes

The homepage demo currently loads `public/iron_man_best.ksplat` with
`@mkkellogg/gaussian-splats-3d`.

This site was originally based on Takuya Matsuyama's homepage structure and has
since been redesigned as a CV-style research portfolio.
