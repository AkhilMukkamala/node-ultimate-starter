const log4js = require('log4js');
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../../logs');

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const outLevel = process.env.OUT_LEVEL;
const errLevel = process.env.ERR_LEVEL;

const outLogFile = process.env.OUT_LOG_FILE;
const errLogFile = process.env.ERR_LOG_FILE;

// Log4JS Configuration

log4js.configure({
    appenders: {
        info: {type: 'dateFile', filename: logDir + '/' + outLogFile, compress: true},
        error: {type: 'dateFile', filename: logDir + '/' + errLogFile, compress: true},
    },
    categories: {
        default: {appenders: ['info'], level: outLevel },
        error: {appenders: ['error'], level: errLevel }
    }
});


const log = (level, message) => {
    const l = log4js.getLogger(level);
    if (level === 'error') {
        return l.error(JSON.stringify(message));
    } else {
        return l.info(JSON.stringify(message));
    }
};

module.exports.log = log;
