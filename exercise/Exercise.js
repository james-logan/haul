var mongo = require('../lib/mongodb.js');
var fuzzy = require('fuzzy');

var Exercise = function (pojo) {
  this.name = pojo.name;
  this.grouping = pojo.grouping;
  this.muscle = pojo.muscle;
  this.secondary = pojo.secondary;
  this.equipment = pojo.equipment;
}

Exercise.find = function (query, cb) {
  mongo.getDb().collection('exercises').find({}).toArray(function (err, arr) {
      console.log(err)
      console.log(arr)
      var options = {
        extract: function (exerObj) {
          if (exerObj.name) {
            return exerObj.name
          } else {
            return ""
          }

        }
      }
      var results = fuzzy.filter(query, arr, options)
      var results = results.map(function (result) {
        return result.original
      })
      cb(err, results)
  })
}

Exercise.insertOne = function (exerciseObj, cb) {
  mongo.getDb().collection('exercises').insertOne(exerciseObj, cb)
}

module.exports = Exercise;
