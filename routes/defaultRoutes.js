const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel').User;
// const singlePost = require('default/singlePost').singlePost;
// const singlePost = require('../default/singlePost')
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'default';
    next();
})

//getting router setup from controllers-defaultcontrollers
//created a router object and a route function 
//this matches by path and we can do get, post, put, delete...
//for get method it will look for index method which is inside defaultControllers.js


//no inspection JS Check function signatures
router.route('/')
    .get(defaultController.index)





//defining local statergey
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email: email }).then(user => {
        if (!user) {
            return done(null, false, req.flash('error-message',
                'user not found with this email'));
        }
        bcrypt.compare(password, user.password, (err, passwordMatched) => {
            if (err) {
                return err;

            }
            if (!passwordMatched) {
                return done(null, false, req.flash('error-message', 'Invalid user Name or Password'));
            }
            return done(null, user, req.flash('success-message', 'Login successful'));

        });
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    })
})









//no inspection JS Check function signatures
router.route('/login')
    .get(defaultController.loginGet)
    .post(passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: true,
        session: true
    }), defaultController.loginPost)

router.route('/register')
    .get(defaultController.registerGet)
    .post(defaultController.registerPost)


router.route('/post/:id')
    .get(defaultController.singlePost);

// router.route('/post/id')
//     .get(defaultController.singlePost);

module.exports = router;