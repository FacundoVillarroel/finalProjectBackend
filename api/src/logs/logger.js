const log4js = require("log4js");

const isVercel =
  process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

const appenders = {
  console: { type: "console" },
};

const categories = {
  default: { appenders: ["console"], level: "info" },
};

if (!isVercel) {
  appenders.warnFile = { type: "file", filename: "./src/logs/warn.log" };
  appenders.errorFile = { type: "file", filename: "./src/logs/error.log" };
  appenders.soloWarn = {
    type: "logLevelFilter",
    appender: "warnFile",
    level: "warn",
  };
  appenders.soloError = {
    type: "logLevelFilter",
    appender: "errorFile",
    level: "error",
  };

  categories.development = {
    appenders: ["console", "soloWarn", "soloError"],
    level: "info",
  };
  categories.production = {
    appenders: ["soloWarn", "soloError"],
    level: "warn",
  };
}

log4js.configure({ appenders, categories });

// Use "development" unless you're in Vercel or production
const logToUse = isVercel
  ? "default" // Console-only in Vercel
  : process.env.NODE_ENV === "PROD"
  ? "production"
  : "development";

module.exports = log4js.getLogger(logToUse);
