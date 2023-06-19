/** @type {[string, (...args: any[]) => any][]} */
const figmaOnHandlers = [];
/** @type {[string, (...args: any[]) => any][]} */
const figmaUiOnHandlers = [];

const randomId = () => `${Math.random()}`;

const getNodeWithDefaults = (jestFn, type) => ({
  type,
  id: randomId(),
  appendChild: jestFn(() => {}),
  resize: jestFn(() => {}),
  setSharedPluginData: jestFn(() => {}),
  getSharedPluginData: jestFn(() => {}),
  remove: jestFn(() => {}),
});

/** @type {(() => void) => {}} */
module.exports.getFigmaMock = (jestFn) => {
  return {
    showUI: jestFn(),
    on: jestFn((name, handler) => {
      figmaOnHandlers.push([name, handler]);
    }),
    currentPage: {
      selection: [],
    },
    viewport: {
      scrollAndZoomIntoView: jestFn(),
    },
    clientStorage: {
      getAsync: jestFn(() => Promise.resolve()),
      setAsync: jestFn(() => Promise.resolve()),
    },
    notify: jestFn(),
    ui: {
      postMessage: jestFn(),
      on: jestFn((eventName, handler) => {
        figmaUiOnHandlers.push([eventName, handler]);
      }),
      off: jestFn((eventName, handler) => {
        const indexOf = figmaUiOnHandlers.findIndex(
          (entry) => entry[0] === eventName && entry[1] === handler
        );
        if (indexOf > -1) {
          figmaUiOnHandlers.splice(indexOf, 1);
        }
      }),
    },
    root: {
      setSharedPluginData: jestFn(),
      getSharedPluginData: jestFn(),
      findOne: jestFn(() => null),
      children: [],
    },
    widget: {
      useEffect: jestFn((callback) => callback()),
    },
    getLocalPaintStyles: jestFn(() => []),
    getLocalTextStyles: jestFn(() => []),
    getLocalEffectStyles: jestFn(() => []),
    getStyleById: jestFn(() => {}),
    loadFontAsync: jestFn(() => Promise.resolve()),
    createTextStyle: jestFn(() => ({ id: randomId() })),
    createPaintStyle: jestFn(() => ({ id: randomId() })),
    createEffectStyle: jestFn(() => ({ id: randomId() })),
    importStyleByKeyAsync: jestFn(() => Promise.reject()),
    getNodeById: jestFn(() => null),
    createImage: jestFn(() => ({})),
    createComponent: jestFn(() => getNodeWithDefaults(jestFn, "COMPONENT")),
    createPage: jestFn(() => getNodeWithDefaults(jestFn, "PAGE")),
    createRectangle: jestFn(() => getNodeWithDefaults(jestFn, "RECTANGLE")),
    createFrame: jestFn(() => getNodeWithDefaults(jestFn, "FRAME")),
    createLine: jestFn(() => getNodeWithDefaults(jestFn, "LINE")),
    createText: jestFn(() => getNodeWithDefaults(jestFn, "TEXT")),
    combineAsVariants: jestFn(() =>
      getNodeWithDefaults(jestFn, "COMPONENT_SET")
    ),
    closePlugin: jestFn(),
  };
};
