var mongo = require('../lib/mongodb.js');


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

module.exports = Workout;

