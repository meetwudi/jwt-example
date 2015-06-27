var jwt = require('jsonwebtoken');
var User = require('../models/User');

function apiAuth(req, res, next) {
  var token = req.get('X-Auth-Token');
  jwt.verify(token, process.env.JWT_SECRET, function(err, decode) {
    if (err) return next(err);
    User.findOne({ username: decode.username }, function(err, user) {
      if (err) return next(err);
      req.user = user;
      return next();
    })
  });
};

module.exports = function() {
  return apiAuth;
};

