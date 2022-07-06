const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/User');


passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user)
})


// passport.use('localSignup', new localStrategy({}, () => {}))
// {} represent the object/data that we are receving from the client
// () Represent what are we going to do with the client is data


// Sign-Up Process
passport.use('localSignup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ userEmail: email })
    if (user) {
        return done(null, false, req.flash('signupMessage', 'The Email is already taken.'));
    } else {
        const newUser = new User();
        newUser.userEmail = email;
        newUser.userPassword = newUser.encryptPassword(password);
        await newUser.save()
        done(null, newUser);
    }
}));

// Signin Process
passport.use('local-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.find({ userEmail: email });

    if (!user) {
        return done(null, false, req.flash('signinMessage', `This account doesn't exits.`));
    }

    if (!user.validatePassword(password)) {
        return done(null, false, req.flash('signinMessage', `Incorrect password.`));
    }
    done(null, user);
}))