const express = require('express');
const router = express.Router({ mergeParams: true });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('<h1>API is running...</h1>');
});

module.exports = router;
