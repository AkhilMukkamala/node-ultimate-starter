require('dotenv').config();

/**
 * Module dependencies.
 */

const express = require('express');
const app = express();

const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const helmet = require('helmet');
const lusca = require('lusca');

const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const useragent = require('express-useragent');
const publicIp = require('public-ip');
const geoip = require('geoip-lite');

const mid = require('./api/middleware/AuthValidation');
const validateTkn = mid.verifyToken;

const Constants = require('./constants');

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const socket = require('./ws')(io);

/**
 * Logger
*/
const log4js = require('log4js');
const logger = require('./services/Logger');
const infoLogger = log4js.getLogger('info');

/**
 * Routers
 */

const auth = require('./api/routes/Authentication');
const users = require('./api/routes/Users');
const test = require('./api/routes/Test');

app.use(log4js.connectLogger(infoLogger, {
    level: 'info',
    // include the Express request ID in the logs
    format: (req, res, format) => format(`":method :url HTTP/:http-version" :remote-addr - ${JSON.stringify(req.body)} :content-length :status :response-time ms ":referrer" ":user-agent"`)
}));

/**
 * DB Config and Connection
 */

mongoose.connect(
    process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        poolSize: 10, // Maintain up to 10 socket connections
    },
    err => {
        if (err) {
            logger.log('error', err);
        } else {
            logger.log('info', `Connection to Database Successfull`);
        }
    }
);

app.use(useragent.express());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');

app.enable('trust proxy', true)

app.use(cookieParser());
app.use(helmet());

app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000
        },
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            autoReconnect: true,
        })
}));

// Set Client IP & Co-ordinates
app.use(async (req, res, next) => {

    //  useragent
    let useragent = req.useragent;
    let ua = {};
    for (key in useragent) {
        if (useragent[key]) {
            ua[key] = useragent[key]
        }
    }
    // Delete unneccessary keys from UA.
    delete ua.geoIp

    // Set UA.

    req.useragent = ua;

    let ip = await publicIp.v4();
    let geo = geoip.lookup(ip);

    // Delete Unnecessary keys in the Object.
    delete geo.metro;
    delete geo.area;
    delete geo.eu;
    delete geo.range;

    let coordinates = {
        lat: geo.ll[0],
        long: geo.ll[1]
    }
    geo['coordinates'] = coordinates;
    delete geo.ll

    //  Set the ClientIP and ClientAddress in the request Object.
    req.clientIp = ip;
    req.clientAddress = geo;
    next();
})

/**
 * CORS
 */

app.use((req, res, next) => {
    req.userip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, authtoken, contentType, Content-Type, authorization'
    );
    next();
});

/**
 * API Urls
 */

app.use(test);
app.use('/api/v1', auth);
// app.use(validateTkn); // Uncomment to add middleware.
app.use('/api/v1', users);


app.options('*', (req, res) => {
    res.end();
});

/**
 * Uncaught Exceptions and Unhandled Rejections Handler
 */
process.on('unhandledRejection', (reason, rejectedPromise) => {
    logger.log('error', `${reason}`);
    throw reason;
});

process.on('uncaughtException', err => {
    logger.log('error', `${err.message}, ${err.stack}`);
    process.exit(1);
});

// 404 handler

app.use((req, res) => {
    res.status(404).json({
        message: Constants.URL_NOT_FOUND
    });
});


server.listen(process.env.PORT, () => {
    logger.log(Constants.INFO, `app is running at PORT: ${process.env.PORT}, ENVIRNOMENT: ${process.env.NODE_ENV}`)
});
