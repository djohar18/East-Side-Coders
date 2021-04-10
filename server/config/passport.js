let LocalStrategy = require("passport-local").Strategy;
let passport = require('passport');

// Load User model
let User = require("../models/users");

module.exports = function (passport) {
  console.log('passport entered..');
  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      (username, password, done) => {
        // Match user
        User.findOne({
          username: username,
        }).then((User) => {
          if (!User) {
            return done(null, false, {
              message: "That username or password is incorrect",
            });
          }

          if (User && password !== User.password) {
            return done(null, false, {
              message: "Incorrect Password",
            });
          }
          return done(null, User);
        });
      }
    )
  );

  passport.serializeUser(function (User, done) {
    done(null, User.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, User) {
      done(err, User);
    });
  });
};