'use strict';
var express = require('express');
var router = express.Router();
var wrkCtrl = require('./workoutcontroller.js');
var exerCtrl = require('./exercisecontroller.js')

//cat
router.post('/exercises', exerCtrl.add)
router.get('/exercises', exerCtrl.search)

router.get('/workout', wrkCtrl.findOne)
router.post('/workout', wrkCtrl.save)

router.get('/workouts', wrkCtrl.findAll)

router.post('/programs', wrkCtrl.saveProg)
router.get('/programs', wrkCtrl.findProgs)

router.post('/complete', wrkCtrl.finish)

router.get('/schedule', wrkCtrl.grab)

router.post('/goals/program', wrkCtrl.adopt)

// router.get('/goals', wrkCtrl.goals)

module.exports = router;
