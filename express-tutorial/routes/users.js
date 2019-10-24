var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/anshul', function(req, res, next) {
  res.send('you have reached Anshul');
});

module.exports = router;
