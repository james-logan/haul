var mongo = require('../lib/mongodb.js');
var ObjectID = require('mongodb').ObjectID;


var Workout = function (pojo) {
  this.name = pojo.name;
  this.exercises = pojo.exercises;
  this.author = pojo.author;
  this.authorid = pojo.authorid;
}

Workout.saveNew = function (userObj, workoutObj, cb) {
  console.log(workoutObj)
  workoutObj.authorid = userObj._id;
  workoutObj.author = userObj.username;
  var workout = new Workout(workoutObj)
  console.log(workout)
  mongo.getDb().collection('workouts').insertOne(workout, cb)
}

Workout.findAll = function (userObj, cb) {

  mongo.getDb().collection('workouts').find({"authorid": userObj._id}).toArray(function (err, data) {
    cb(err, data);
  })
}

Workout.findProgs = function (userObj, cb) {
  console.log(userObj);
  mongo.getDb().collection('programs').find({"authorid": userObj._id}).toArray(function (err, data) {
    console.log("running?")
    if (err) {
      console.log(err)
      cb(err, null)
    } else {
      console.log('not an error')
      cb(null, data)
    }
  })
}

Workout.findOne = function (id, cb) {
  mongo.getDb().collection('workouts').findOne({_id: ObjectID(id)}, function (err, data) {
    cb(err, data)
  })
}

Workout.saveProg = function (userObj, progObj, cb) {
  console.log('save program is running')
  progObj.author = userObj.username;
  progObj.authorid = userObj._id;
  mongo.getDb().collection('programs').insertOne(progObj, cb)
}

Workout.findCompleted = function (userObj, compWork, cb) {
  console.log('cat master')
  console.log(compWork)
  compWork.workoutId = compWork._id;
  compWork.date = new Date();
  delete compWork._id;
  mongo.getDb().collection('completed').updateOne({userId: userObj._id}, {$push: {completed: compWork}}, {upsert: true}, cb)
}

Workout.pullCompleted = function (userObj, cb) {
  mongo.getDb().collection('completed').findOne({userId: userObj._id}, function (err, past) {
    Workout.scheduler(err, past, cb)
  })
}

Workout.scheduler = function (err, past, cb) {
  console.log(past)
  if (past) {
    var parcel = {
      color: "black",
      textColor: "yellow",
      allDayDefault: true
    }
    parcel.events = past.completed.map(function (wo) {
      wo.title = wo.name
      wo.start = wo.date.toLocaleDateString('en-US')
      return wo
    })
    cb(null, parcel)
  } else {
    cb(err, null)
  }
}

Workout.makeExtendedProg = function (userObj, program, cb) {
  console.log(program)
  var days = program.days.map(function (wo) {
    if (wo != 'Rest') {
      return ObjectID(wo)
    } else {
      return 'Rest'
    }

  })
  mongo.getDb().collection('workouts').find({_id:{$in: days}}).toArray(function (err, data) {
    if (err) {
      cb(err, null)
    } else {
      data.forEach(function (wo) {
        program.days.forEach(function (day, i) {
          console.log('DAY', i+1)
          console.log(typeof day, day)
          if (typeof day != 'object' && day != "Rest" && ObjectID(day).equals(wo._id)) {
            // console.log(program.days[i])
            program.days[i] = wo;
            // console.log(program.days[i])
          }
        })
      })
      Workout.adopt(userObj, program, cb)
    }
  })
}

Workout.adopt = function (userObj, programExt, cb) {
  mongo.getDb().collection('goals').updateOne({'goalOwner': userObj._id}, {goalOwner: userObj._id, program: programExt}, {upsert: true}, function (err, data) {
    cb(err, programExt)
  })
}

module.exports = Workout;

