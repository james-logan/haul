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
    workOutModel.saveProg(req.session.user, req.body, function (err, data) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send("It worked")
      }
    })
  },
  findProgs: function (req, res) {
      workOutModel.findProgs(req.session.user, function (err, data) {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(200).send(data)
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
  },
  finish: function (req, res) {
    workOutModel.findCompleted(req.session.user, req.body, function (err, data) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send("Workout saved!")
      }
    })
  },
  grab: function (req, res) {
    workOutModel.pullCompleted(req.session.user, function (err, data) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(data)
      }
    })
  },
  adopt: function (req, res) {
    workOutModel.makeExtendedProg(req.session.user, req.body, function (err, data) {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(data)
        res.status(200).send(data)
      }
    })
  },
  addGoals: function (req, res) {
    workOutModel.addGoals(req.session.user, req.body, function (err, data) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(data)
      }
    })
  },
  getGoals: function (req, res) {
    workOutModel.getGoals(req.session.user, function (err, data) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(data)
      }
    })
  }
}
