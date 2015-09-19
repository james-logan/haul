'use strict';

var express = require('express');
var router = express.Router();

var User = require('../user/User')


router.post('/register', function (req, res) {
  User.create(req.body, function (err, user) {
    req.session.regenerate(function () {
      req.session.user = user;
      res.status(200).send({win: true})
    })
  })
})

router.post('/login', function (req, res) {
  User.login(req.body, function (err, user) {
    if (err) {
      res.status(403).send(err)
    } else {
      res.locals.user = user;
      req.session.regenerate(function () {
        console.log('USER>>>>>>', user)
        req.session.user = user;
        res.status(200).send({win: true})
      })
    }
  })
})

router.post('/logout', function (req, res) {
  req.session.destroy(function () {
    res.send({message: "User has logged out"})
  })
})

router.get('/stats', function (req, res) {
  User.pull(req.session.user._id, function (err, data) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(data);
    }
  })
})


module.exports = router
