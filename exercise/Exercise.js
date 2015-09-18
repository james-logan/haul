var mongo = require('../lib/mongodb.js');

var Exercise = function (pojo) {
  this.name = pojo.name;
  this.grouping = pojo.grouping;
  this.muscle = pojo.muscle;
  this.secondary = pojo.secondary;
  this.equipment = pojo.equipment;
}

Exercise.find = function (query, cb) {
  mongo.getDb().collection('exercises').find({"name": query}).toArray(function (err, items) {
    if (err) throw err;
    cb(err, items)
  })
}

Exercise.insertOne = function (exerciseObj, cb) {
  mongo.getDb().collection('exercises').insertOne(exerciseObj, function (err, data) {
    if (err) throw err;
    cb(err, data)
  })
}

module.exports = Exercise;
