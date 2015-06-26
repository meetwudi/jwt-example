var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');

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

router.post('/login', passport.authenticate('local', authOptions), function(req, res, next) {
  return res.redirect('/');
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
