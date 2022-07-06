const express = require('express');
const { route } = require('express/lib/application');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();

const passport = require('passport')


router.get('/', (req, res, next) => {
    res.render("index")
});


router.get('/signup', (req, res, next) => {
    res.render("signup")
});

router.post('/signup', passport.authenticate('localSignup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

router.get('/signin', (req, res, next) => {
    res.render('signin')
});


router.post('/signin', passport.authenticate('localSignin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
    req.logout((data) => { console.log(data) });
    res.redirect('/');
});


router.use((req, res, next) => {
    isAuthenticated(req, res, next);
    next();
})

router.get('/dashboard', (req, res, next) => {
    res.send('dashboard')
})

router.get('/profile', (req, res, next) => {
    res.render('profile');
});


function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
}

module.exports = router;