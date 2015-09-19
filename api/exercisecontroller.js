var exerciseModel = require('../exercise/Exercise');

module.exports = {
  search: function (req, res) {
    exerciseModel.find(req.query.exer, function (err, data) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(data)
      }
    })
  },
  add: function (req, res) {
    console.log(req.body)
    exerciseModel.insertOne(req.body, function (err, data) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send("It worked")
      }
    });
  }
}


