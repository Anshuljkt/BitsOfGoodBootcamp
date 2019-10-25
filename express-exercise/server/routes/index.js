var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/health', function(req, res, next) {
  res.status(200);
  res.json({status: "pass", version: "1.0"});
});

router.post('/multiply', function(req, res, next) {
  const nums = req.body.factors;
  if (!Array.isArray(req.body.factors)) {
    const error = "Expected factors to be an array.";
    res.status(400).json({error});
  } else if(nums.some(i => isNaN(i))) {
    const error = "Expected factors array to only contain numbers.";
    res.status(400).json({error});
  } else {
    const result = nums.reduce((a,b) => a * b);
    // console.log(nums);
    res.json({result});
  }
});

router.get('/fibonacci', function(req, res, next) {
  const input = req.query.limit;
  if (isNaN(input)) {
    const error = "Expected limit to be a number.";
    res.status(400).json({error});
  } else if (input < 0) {
    const error = "Expected limit to be greater than or equal to 0.";
    res.status(400).json({error});
  } else {
    const result = fibonacci(input);
    res.json({result});
  }
});

function fibonacci(num) {
  if (num <= 1) return 1;

  return fibonacci(num - 1) + fibonacci(num - 2);
}

module.exports = router;
