'use strict';

var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
  res.render('index')
})

router.get('/front', function (req, res) {
  res.render('templates/front')
})

router.get('/newworkout', function (req, res) {
  res.render('templates/newworkout')
})

module.exports = router
