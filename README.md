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

## Browser-based API(s)

To make possible to interact with browser-based interactions (such as network requests and so on) we need to use the plugin-way (so trigger a iFrame with the HTML provided on `ui.html` file).

### How to trigger the iFrame

To trigger the iFrame, simply return a Promise with showUi:

```typescript
return new Promise(() => {
  figma.showUI(__html__, { visible: false });
});
```

The iFrame will keep running until:

- the promise will be resolved
- explicitly calling `figma.closePlugin()`

### Send data from widget to the iFrame

To do so:

```typescript
figma.ui.postMessage({
  type,
  ...
});
```

Then we should register a `onmessage` handler on the html ui:

```typescript
window.onmessage = (event) => {
  const { type } = event.data.pluginMessage;
  ...
};
```

### Send data from the iFrame to the widget

From the iFrame we can post a message which could be received on the widget:

```typescript
parent.postMessage({ pluginMessage: { type: "close-plugin" } }, "*");
```

then on the widget:

```typescript
figma.ui.onmessage = (msg) => {
  const { type } = msg;
  ...
};
```
