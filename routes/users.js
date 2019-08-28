var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Register
router.get('/addJudge',ensureAdmin, function (req, res) {
    res.render('addJudge');
});

// Login
router.get('/login',loggedIn, function (req, res) {
    res.render('login');
});

// Register User
router.post('/addJudge', function (req, res) {
    var login = req.body.login123;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var apparatus = req.body.apparatus;
    var role = req.body.role;



   var errors;

    if (errors) {
        res.render('addJudge', {
            errors: errors
        });
    }
    else {
        //checking for username is already taken
        User.findOne({username: login}).then(user => {

            if (user) {
                req.flash('danger', 'Username already taken!');
                res.redirect('addJudge');
            } else {

                var newUser = new User({
                    username: login,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    apparatus: apparatus,
                    role: role

                });

                User.createUser(newUser, function (err, user) {
                    if (err) throw err;
                    console.log(user);

                });
                req.flash('success', 'You are registered and can now login');
                res.redirect('/users/login');
            }
        })

    }

});
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.getUserByUsername(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect:'/',
        failureRedirect:'/users/login'
    })(req, res, next);
});

router.get('/logout', function (req, res) {
    req.logout();

    req.flash('success', 'You are logged out');

    res.redirect('/users/login');
});
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
}
function loggedIn(req, res, next){
    if(req.isAuthenticated()){
        req.flash('danger', 'You are alredy logged in!');
        res.redirect('/');
    } else {

        return next();
    }
}
function ensureAdmin(req, res, next){
    if(req.user && req.user.role==='Admin'){
        return next();
    } else {
        req.flash('danger', 'Please login as admin');
        if(req.user)
            res.redirect('/')
        else
            res.redirect('/users/login');
    }
}
module.exports = router;