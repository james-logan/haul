var workOutModel = require('../workout/Workout')

module.exports = {
  save: function (req, res) {
    workOutModel.saveNew(req.body)
  }
}
