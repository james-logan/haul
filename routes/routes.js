'use strict';

var express = require('express');
var router = express.Router();

var mongo = require('../lib/mongodb');


router.get('/', function (req, res) {
  res.render('index')
})

router.get('/front', function (req, res) {
  res.render('templates/front')
})

router.get('/newworkout', function (req, res) {
  res.render('templates/newworkout')
})

router.get('/api/exercises', function (req, res) {
  mongo.getDb().collection('exercises').find({"name": req.query.exer}).toArray(function (err, items) {
    res.send(items)
  })
})

router.get('/login', function (req, res) {
  res.render('templates/login')
})

router.get('/register', function (req, res) {
  res.render('templates/register')
})

router.get('/schedule', function (req, res) {
  res.render('templates/schedule')
})

router.get('/stats', function (req, res) {
  res.render('templates/stats')
})
router.get('/programs', function (req, res) {
  res.render('templates/programs')
})
router.get('/complete', function (req, res) {
  res.render('templates/complete')
})
router.get('/select', function (req, res) {
  res.render('templates/select')
})

module.exports = router
