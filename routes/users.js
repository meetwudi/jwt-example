var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');
var jwt = require('jsonwebtoken');

var authOptions = { 
  successRedirect: '/', 
  failureRedirect: '/login'
};

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, account) {
    if (err) return next(err);
    passport.authenticate('local', authOptions)(req, res, function(err) {
      if (err) return next(err);
      res.redirect('/');
    });
  });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    var acceptType = req.get('Accept');
    if (!user) {
      if (acceptType === 'application/json') {
        return res.json(401, { error: 'error' });
      }
      else {
        return res.redirect('/login');
      }
    }
    if (acceptType === 'application/json') {
      var token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
        expiresInSeconds: 60,
        issuer: 'John Wu'
      });
      return res.json({ token: token });
    }
    else {
      req.logIn(user, function(err) {
        if (err) return next(err);
        return res.redirect('/');
      });
    }
  })(req, res, next);
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
