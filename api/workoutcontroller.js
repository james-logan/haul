var workOutModel = require('../workout/Workout')

module.exports = {
  save: function (req, res) {
    workOutModel.saveNew(req.body)
  },
  saveProg: function (req, res) {
    console.log('controller save prog running')
    workOutModel.saveProg(req.body)
  },
  findAll: function (req, res) {
    workOutModel.findAll(function (err, data) {
      res.send(data)
    })
  }
}
