var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/health', function(req, res, next) {
  res.status(200);
  res.json({status: "pass", version: "1.0"});
  res.send();
});

router.post('/multiply', function(req, res, next) {
  
})

module.exports = router;
