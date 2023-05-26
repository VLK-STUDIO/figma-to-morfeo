const JsDomEnvironment = require("jest-environment-jsdom").TestEnvironment;
const { getFigmaMock } = require("./getFigmaMock");

class FigmaEnvironment extends JsDomEnvironment {
  constructor(config, context) {
    super(config, context);
    this.testPath = context.testPath;
    this.docblockPragmas = context.docblockPragmas;
  }

  async setup() {
    await super.setup();
    this.global.figma = getFigmaMock(
      this.moduleMocker.fn.bind(this.moduleMocker)
    );
    this.global.__html__ = "";
  }

  async teardown() {
    delete this.global.figma;
    delete this.global.__html__;
    await super.teardown();
  }

  async handleTestEvent(event) {
    if (event.name === "test_start") {
      this.moduleMocker.clearAllMocks();
    }
  }
}

module.exports = FigmaEnvironment;
