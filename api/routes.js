'use strict';
var express = require('express');
var router = express.Router();
var wrkCtrl = require('./workoutcontroller.js');
var exerCtrl = require('./exercisecontroller.js')


router.post('/exercises', exerCtrl.add)
router.get('/exercises', exerCtrl.search)

router.get('/workout', wrkCtrl.findOne)
router.post('/workout', wrkCtrl.save)

router.get('/workouts', wrkCtrl.findAll)

router.post('/programs', wrkCtrl.saveProg)

router.post('/complete', wrkCtrl.finish)

module.exports = router;
