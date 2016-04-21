export default class Launcher {
  constructor ({ noInterface, noWatch, server }) {
    if (!noWatch || server) {
      this.watch();
    }

    if (!noInterface || server) {
      this.startInterface();
    }
  }

  startInterface () {
  }

  watch () {
  }
}
