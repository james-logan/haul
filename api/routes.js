'use strict';
var express = require('express');
var router = express.Router();
var wrkCtrl = require('./workoutcontroller.js');
var exerCtrl = require('./exercisecontroller.js')



router.get('/exercises', exerCtrl.search)

router.post('/workout', wrkCtrl.save)

module.exports = router;
