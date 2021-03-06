const express = require('express');
const engine_EjsMate = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');


// Initializations
const app = express();
require('./database');
require('./passport/localAuth')

// Settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine_EjsMate);
app.set('view engine', 'ejs');
app.set('port', process.envPORT || 3000);

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    // console.log('Signup message', !app.locals.signupMessage.length)
    // console.log('Signin message', !app.locals.signinMessage.length)
    // app.locals.house = "KLK En La Casa"
    app.locals.user = req.user;
    next();
})

// Routes
app.use('/', require('./routes/index'))


// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});