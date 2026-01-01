
const PROJECT_NAME = "Veil";

var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2[LogLevel2["ERROR"] = 0] = "ERROR";
  LogLevel2[LogLevel2["WARN"] = 1] = "WARN";
  LogLevel2[LogLevel2["INFO"] = 2] = "INFO";
  LogLevel2[LogLevel2["DEBUG"] = 3] = "DEBUG";
  return LogLevel2;
})(LogLevel || {});

const stringToLogLevel = (level) => {
  switch (level.toLowerCase()) {
    case "error":
      return 0 /* ERROR */;
    case "warn":
      return 1 /* WARN */;
    case "info":
      return 2 /* INFO */;
    case "debug":
      return 3 /* DEBUG */;
    default:
      return 2 /* INFO */;
  }
};

let currentLogLevel = 2 /* INFO */;

const initializeLogger = (settings) => {
  const levelString = settings.get_string("logging-level");
  currentLogLevel = stringToLogLevel(levelString);

  log(2 /* INFO */, `Logger initialized with level: ${levelString}`);

  settings.connect("changed::logging-level", () => {
    const newLevelString = settings.get_string("logging-level");
    currentLogLevel = stringToLogLevel(newLevelString);
    log(
      2 /* INFO */,
      `Log level changed to: ${newLevelString}`,
      void 0,
      true
    );
  });
};

const log = (level, message, data, logChange = false) => {
  if (level > currentLogLevel && !logChange) {
    return;
  }

  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const levelName = LogLevel[level];
  const prefix = `[${PROJECT_NAME}] ${timestamp} ${levelName}`;

  if (data) {
    console.log(`${prefix}: ${message}`);

    if (typeof data === "object" && data !== null) {
      Object.entries(data).forEach(([key, value]) => {
        console.log(`${prefix}:   ${key}: ${value}`);
      });
    } else {
      console.log(`${prefix}: ${data}`);
    }
  } else {
    console.log(`${prefix}: ${message}`);
  }
};

const debug = (message, data) => {
  log(3 /* DEBUG */, message, data);
};

const info = (message, data) => {
  log(2 /* INFO */, message, data);
};

const warn = (message, data) => {
  log(1 /* WARN */, message, data);
};

const error = (message, error2) => {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const prefix = `[${PROJECT_NAME}] ${timestamp} ERROR`;

  if (error2) {
    console.error(`${prefix}: ${message}`);
    console.error(`${prefix}: ${String(error2)}`);
  } else {
    console.error(`${prefix}: ${message}`);
  }
};

const logger = {
  debug,
  info,
  warn,
  error
};

export {
  LogLevel,
  initializeLogger,
  logger
};
