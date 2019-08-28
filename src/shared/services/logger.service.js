const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, './../logs');

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/${process.env.APPNAME}-%DATE%.log`,
  datePattern: 'YYYY-MM-DD'
});

let logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level} ${info.message}`),
    // format.json()
  ),
  transports: [
    new transports.Console({
      level: 'silly',
      format: format.combine(
        // format.label({ label: path.basename(process.mainModule.filename) }),
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level} ${info.message}`
        ),
        // format.json(),
      )
    }),
    dailyRotateFileTransport
  ]
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};


const log = (type, message) => {
  if (type === 'error') {
    logger.log(type, String(message));
  } else {
    logger.log(type, JSON.stringify(message));
  }
}; 

module.exports = log;
module.exports.logger = logger;
