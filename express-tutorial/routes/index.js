var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  res.send('yo');
});

router.get('/hello', function(req, res, next) {
  console.log('Hello World! printed');
  res.send('Hello world!');
});

module.exports = router;
