const winston = require("winston");

const logConfiguration = {
  transports: [
    new winston.transports.Console({ level: "debug" }),
    new winston.transports.File({
      filename: "./server/log/log.log",
    }),
    new winston.transports.File({
      level: "warn",
      filename: "./server/log/warn.log",
    }),
    new winston.transports.File({
      level: "error",
      filename: "./server/log/error.log",
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    winston.format.printf(
      (info) => `${[info.timestamp]} : [${info.level}]: [${info.message}]`
    )
  ),
};

const logger = winston.createLogger(logConfiguration);
module.exports = logger;
