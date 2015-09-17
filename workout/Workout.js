var mongo = require('../lib/mongodb.js');
var ObjectID = require('mongodb').ObjectID;


var Workout = function (pojo) {
  this.name = pojo.name;
  this.exercises = pojo.exercises;
  this.author = pojo.author;
  this.authorid = pojo.authorid;
}


Workout.saveNew = function (workoutObj, cb) {
  console.log(workoutObj)
  var workout = new Workout(workoutObj)
  console.log(workout)
  mongo.getDb().collection('workouts').insertOne(workout, function (err, data) {
    if (err) throw err;
  })
}

Workout.findAll = function (cb) {
  mongo.getDb().collection('workouts').find().toArray(function (err, data) {
    cb(err, data);
  })
}

Workout.findOne = function (id, cb) {
  mongo.getDb().collection('workouts').findOne({_id: ObjectID(id)}, function (err, data) {
    cb(err, data)
  })
}

Workout.saveProg = function (progObj, cb) {
  console.log('save program is running')
  mongo.getDb().collection('programs').insertOne(progObj, function (err, data) {
    if (err) throw err;
    // cb(err, data)
  })

}

module.exports = Workout;

