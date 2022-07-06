const passport = require('passport');
const localStrategy = require('passport-local').Strategy;


// passport.use('localSignUp', new localStrategy({},()=>{}))

passport.use('localSignUp', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, doneCallBack) => {

}));