'use strict';

var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
  res.render('index')
})

router.get('/:template', function (req, res) {
  res.render('templates/' + req.params.template)
})


module.exports = router
