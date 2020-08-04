var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dust = require('express-dustjs');
var session = require('express-session');

var app = express();

var bodyParser = require('body-parser');

dust._.optimizers.format = function (ctx, node) {
    return node
};

app.engine('dust', dust.engine());
app.set('view engine', 'dust');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

var indexRouter = require('./routes/front');
var apiRouter = require('./routes/api/index');
var apiUsersRouter = require('./routes/api/users');
var apiCategoriesRouter = require('./routes/api/categories');
var apiRequestsRouter = require('./routes/api/requests');
var apiObjects = require('./routes/api/objects');
var apiServices = require('./routes/api/services');
//var apiDemandeRouter = require('./routes/api/demande');

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/categories', apiCategoriesRouter);
app.use('/api/requests', apiRequestsRouter);
app.use('/api/objects', apiObjects);
app.use('/api/services', apiServices);
//app.use('/api/demande', apiDemandeRouter);


module.exports = app;
