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
  mongo.getDb().collection('completed').updateOne({userId: userObj._id}, {$push: {completed: compWork}}, {upsert: true}, cb)
}

module.exports = Workout;

