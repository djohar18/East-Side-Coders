let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// create the User Model instance
let User = require('../models/users');

module.exports.displayLoginPage = (req, res, next) => {    
    res.render('auth/login');
}   

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/users/login",
        // failureFlash: true,
      })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if(!req.User)
    {
        res.render('auth/register',
        {
            title: 'Register',
            // messages: req.flash('registerMessage'),
            displayName: req.User ? req.User.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.create(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log(err);
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                // req.flash(
                //     'registerMessage',
                //     'Registration Error: User Already Exists!'
                // );
                console.log('Error: User Already Exists!')
            }
            (res.body)
            return res.render('auth/register',
            {
                title: 'Register',
                // messages: req.flash('registerMessage'),
                displayName: req.User ? req.User.displayName : ''
            });
        }
        else
        {
            // if no error exists, then registration is successful

            // redirect the user and authenticate them

            /* TODO - Getting Ready to convert to API
            res.json({success: true, msg: 'User Registered Successfully!'});
            */

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/users/login');
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}