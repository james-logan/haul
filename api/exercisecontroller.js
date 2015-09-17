var exerciseModel = require('../exercise/Exercise');

module.exports = {
  search: function (req, res) {
    exerciseModel.find(req.query.exer, function (err, data) {
      res.send(data)
    })
  }
}


