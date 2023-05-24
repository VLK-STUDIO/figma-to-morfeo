# Figma to Morfeo

[![codecov](https://codecov.io/gh/VLK-STUDIO/figma-to-morfeo/branch/main/graph/badge.svg?token=11WG4YLVDD)](https://codecov.io/gh/VLK-STUDIO/figma-to-morfeo)

## Description

This widget allow to easily display, edit and export a Morfeo-ready theme on Figma. It generate a default theme at first run, then allow the user to add, delete or edit any slice.
It also generate a primitive "BOX" component which has all box-related variants (ever in sync automatically!)

### Main features

- easily create and maintain consistent Design system
- document all atomic parts of your theme
- export with a single click a code-ready Morfeo theme

:warning: This project is currently work-in-progress so most of the features are on discussion and not implemented yet

## Quickstart

- Run `yarn` to install dependencies.
- Run `yarn dev` to start in watch mode.
- Open `Figma` -> `Widgets` -> `Development` -> `Import widget from manifest...` and choose `manifest.json` file from this repo.

⭐ Figma API documentation on the [Figma Widget API Reference](https://www.figma.com/widget-docs/api/api-reference/).

## Toolings

This repo is using:

- Esbuild
- TypeScript
- Jest

We also recommend using Commitizen to enhance the experience.

## Scripts

- `yarn test` to run all tests
- `yarn test:ci` to run all tests and collect the coverage
- `yarn compile` to run a tsc check

If need to show plugin UI:

1. Add to manifest.json `"ui": "ui.html",`
2. Create a `ui.html` file with the code
