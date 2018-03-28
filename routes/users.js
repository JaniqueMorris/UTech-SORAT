const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {ensureAuthenticated} = require('../helpers/auth');

// user model
const User = require('../models/User');


// login router (get)
router.get('/login', (req, res) => {
    res.render('users/login', {
        title: 'Login'
    });
});

// login router (post)
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect:'/',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });

// register router (get)
router.get('/register', (req, res) => {
    res.render('users/register', {
        title: 'Register'
    });
});

// register route (post)
router.post('/register', (req, res) => {
    let errors = [];

    if (req.body.password != req.body.password2) {
        errors.push({
            text: 'Passwords do not match'
        });
    }

    if (req.body.password.length < 4) {
        errors.push({
            text: 'Password must be at least 4 characters'
        });
    }

    if (errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        });
    } else {
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    req.flash('error_msg', 'Email already regsitered');
                    res.redirect('/users/register');
                } else {
                    const newUser = new User({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: req.body.password
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in');
                                    res.redirect('/users/login');
                                })
                                .catch(err => {
                                    console.log(err);
                                    return;
                                });
                        });
                    });
                }
            });
    }
});

// logout route
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });

module.exports = router;