var workOutModel = require('../workout/Workout')

module.exports = {
  save: function (req, res) {
    workOutModel.saveNew(req.session.user, req.body, function (err, data) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send("It worked")
      }
    })
  },
  saveProg: function (req, res) {
    console.log('controller save prog running')
    workOutModel.saveProg(req.session.user, req.body, function (err, data) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send("It worked")
      }
    })
  },
  findAll: function (req, res) {
    workOutModel.findAll(req.session.user, function (err, data) {
      res.send(data)
    })
  },
  findOne: function (req, res) {
    workOutModel.findOne(req.query.id, function (err, data) {
      if (err) throw err;
      res.send(data)
    })
  }
}
