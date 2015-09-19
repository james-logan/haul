var mongo = require('../lib/mongodb.js');

var Exercise = function (pojo) {
  this.name = pojo.name;
  this.grouping = pojo.grouping;
  this.muscle = pojo.muscle;
  this.secondary = pojo.secondary;
  this.equipment = pojo.equipment;
}

Exercise.find = function (query, cb) {
  mongo.getDb().collection('exercises').find({"name": query}).toArray(cb)
}

Exercise.insertOne = function (exerciseObj, cb) {
  mongo.getDb().collection('exercises').insertOne(exerciseObj, cb)
}

module.exports = Exercise;
