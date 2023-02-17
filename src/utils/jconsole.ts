class Console {
  private originalConsole: any;
  constructor(originalConsole: any) {
    this.originalConsole = originalConsole;
  }

  get debug() {
    if (window.consoleSign) {
      return this.originalConsole.debug;
    } else {
      return () => {};
    }
  }

  get log() {
    if (window.consoleSign) {
      return this.originalConsole.log;
    } else {
      return () => {};
    }
  }

  get info() {
    if (window.consoleSign) {
      return this.originalConsole.info;
    } else {
      return () => {};
    }
  }

  get warn() {
    if (window.consoleSign) {
      return this.originalConsole.warn;
    } else {
      return () => {};
    }
  }

  get error() {
    if (window.consoleSign) {
      return this.originalConsole.error;
    } else {
      return () => {};
    }
  }

  get memory() {
    return this.originalConsole.memory;
  }

  get assert() {
    return this.originalConsole.assert;
  }

  get clear() {
    return this.originalConsole.clear;
  }

  get count() {
    return this.originalConsole.count;
  }

  get dir() {
    return this.originalConsole.dir;
  }

  get dirxml() {
    return this.originalConsole.dirxml;
  }

  get exception() {
    return this.originalConsole.exception;
  }

  get group() {
    return this.originalConsole.group;
  }

  get groupCollapsed() {
    return this.originalConsole.groupCollapsed;
  }

  get groupEnd() {
    return this.originalConsole.groupEnd;
  }

  get markTimeline() {
    return this.originalConsole.markTimeline;
  }

  get msIsIndependentlyComposed() {
    return this.originalConsole.msIsIndependentlyComposed;
  }

  get profile() {
    return this.originalConsole.profile;
  }

  get profileEnd() {
    return this.originalConsole.profileEnd;
  }

  get select() {
    return this.originalConsole.select;
  }

  get table() {
    return this.originalConsole.table;
  }

  get time() {
    return this.originalConsole.time;
  }

  get timeEnd() {
    return this.originalConsole.timeEnd;
  }

  get timeStamp() {
    return this.originalConsole.timeStamp;
  }

  get timeline() {
    return this.originalConsole.timeline;
  }

  get timelineEnd() {
    return this.originalConsole.timelineEnd;
  }

  get trace() {
    return this.originalConsole.trace;
  }

  get countReset() {
    return this.originalConsole.countReset;
  }

  get Consolets() {
    return this.originalConsole.Consolets;
  }

  get timeLog() {
    return this.originalConsole.timeLog;
  }

  get Console() {
    return this.originalConsole.Console;
  }
}

// 自定义console，通过自定义变量控制
export default function JConsole() {
  //根据环境变量初始化是否打印
  const { REACT_APP_ENV } = process.env;
  const initConsoleSign = REACT_APP_ENV === "dev" ? "true" : "false";

  //consoleSign-是否打印console  false-不打印 true-打印
  const consoleSign = window.sessionStorage.getItem("consoleSign");
  if (!consoleSign) {
    //没有全局设置
    window.sessionStorage.setItem("consoleSign", initConsoleSign);
    window.consoleSign = initConsoleSign === "true";
  } else {
    window.consoleSign = consoleSign === "true";
  }

  window.console = new Console(window.console);
}
