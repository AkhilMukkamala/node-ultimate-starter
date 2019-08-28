// DOTENV CONFIG
require('dotenv').config();

/**
 * Module dependencies.
 */
const express = require('express');
const app = express();
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const winston = require('winston')
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const lusca = require('lusca');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const useragent = require('express-useragent');
const fs = require('fs');
const path = require('path');
const publicIp = require('public-ip');
const geoip = require('geoip-lite');

// Socket
let server = require('http').Server(app);
// let io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


// middleware
const mid = require('./middleware');
const validateTkn = mid.verifyToken;

//  logger
// const log = require('./services/logger.service');
let log = require('./shared/services/logger.service');
let streams = require('./shared/services/logger.service').logger;

/**
 * DB Config and Connection
 */

// mongoose.Promise = global.Promise;

mongoose.connect(
    process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
    },
    err => {
        if (err) {
            // log.error(err);
            log('error', err);
        } else {
            log('info', `Connection to Database Successfull`);
        }
    }
);

/**
 * Routers
 */

const auth = require('./components/authentication/authentication.api');
const users = require('./components/users/users.api');


// var requestStream = fs.createWriteStream(path.join(__dirname, 'logs/requests.log'), { flags: 'a' })


// app.use(compression());
// app.use(logger('combined', { stream: requestStream }));
app.use(useragent.express());
app.use(logger('combined', { stream: streams.stream }))
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.enable('trust proxy', true)

app.use(cookieParser());
app.use(
    session({
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
    })
);


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
    console.log(req.clientAddress)
    next();
})

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');

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
app.use('/api/v1', auth);
// app.use(validateTkn); // Uncomment to add middleware.
app.use('/api/v1', users);



// io.on('connection', function (socket) {

//     // console.log('a user connected');

//     // socket.on('disconnect', function () {
//     //     console.log('user disconnected');
//     // });

//     socket.on('sending message', (message) => {
//         console.log('Message is received :', message);

//         if (message == 'HHH') {
//             io.emit('new message', {message: 'Intent Success'});
//         } else {
//             io.emit('new message', {message: 'No Intent'});

//         }


//      });
// });


app.options('*', (req, res) => {
    res.end();
});

/**
 * Error Handler.
 */
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

//     // add this line to include winston logging
//     log('error', `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
//     // log.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
//     res.status(err.status || 500);
// });


/**
 * Uncaught Exceptions and Unhandled Rejections Handler
 */
process.on('unhandledRejection', (reason, rejectedPromise) => {
    // log.error('rejection', reason);
    // log.error('rejection', rejectedPromise);
    log('error', `${reason}`);
    throw reason;
});

process.on('uncaughtException', err => {
    log('error', `${err.message}, ${err.stack}`);
    // log.error(err.message, err.stack);
    process.exit(1);
});

// 404 handler

app.use((req, res) => {
    res.status(404).json({
        error: 1,
        message: 'URL Not Found'
    });
});

process.env.NODE_ENV == 'development' ? process.env.DOMAIN = 'localhost' : process.env.DOMAIN


server.listen(process.env.PORT, () => {
    log('info', `app is running at DOMAIN: ${process.env.DOMAIN},  PORT: ${process.env.PORT}, ENVIRNOMENT: ${process.env.NODE_ENV}`)
    // log.info(`app is running at DOMAIN: ${process.env.DOMAIN},  PORT: ${process.env.PORT}, ENVIRNOMENT: ${process.env.NODE_ENV}`);
});
