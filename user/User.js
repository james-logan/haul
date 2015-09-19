var bcrypt = require('bcrypt')
var mongo = require('../lib/mongodb.js');
var ObjectID = require('mongodb').ObjectID

var User = function (u) {
  this.email = u.email
  this.hashedPassword = u.hashedPassword;
  this.sex = u.sex;
  this.age = u.age;
  this.username = u.username;
}

User.create = function (u, cb) {
  bcrypt.hash(u.password, 8, function (err, hashedPassword) {
    u.hashedPassword = hashedPassword;
    var user = new User(u);
    mongo.getDb().collection('users').insertOne(user, function (err, data) {
      console.log(data)
      cb(err, data.ops[0]);
    })
  })
}

User.login = function (u, cb) {
  mongo.getDb().collection('users').findOne({username: u.username}, function (err, user) {
    console.log(user)
    if (user) {
      bcrypt.compare(u.password, user.hashedPassword, function (err, match) {
        console.log(match)
        if (match) {
          cb(null, user)
        } else {
          cb("Bad email or password")
        }
      })
    } else {
      cb("Bad email or password")
    }
  })
}

User.pull = function (id, cb) {
  mongo.getDb().collection('users').findOne({"_id": ObjectID(id)}, function (err, data) {
    if (err) {
      cb(err, null)
    } else {
      var response = data;
      response.hashedPassword = ""
      response.email = ""
      cb(null, response)
    }
  })
}

module.exports = User;
