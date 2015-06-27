var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.post('/test', function(req, res, next) {
  res.json({ username: req.user.username });
});

module.exports = router;
