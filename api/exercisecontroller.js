var exerciseModel = require('../exercise/Exercise');

module.exports = {
  search: function (req, res) {
    exerciseModel.find(req.query.exer, function (err, data) {
      res.send(data)
    })
  },
  add: function (req, res) {
    console.log(req.body)
    exerciseModel.insertOne(req.body, function (err, data) {
      res.status(201)
    });
  }
}


