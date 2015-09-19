var express = require('express');
var app = express();

var sass = require('node-sass-middleware');

var bodyParser = require('body-parser');
var routes = require('./routes/routes');
var api = require('./api/routes');
var secrets = require('./config/secrets');
var session = require('express-session');

//bringing in the database module
var database = require('./lib/mongodb');

//session middleware
app.use(session({
  secret: secrets.session,
  resave: false,
  saveUninitialized: true
}))

app.use(function (req, res, next) {
  console.log('SESSION>>>>>>>>>>', req.session)
  next();
})

//setting the local user value for that response
app.use(function getAuthStatus(req, res, next) {
  if (req.session.user) {
    console.log(req.session.user)
    res.locals.user = req.session.user;
  } else {
    res.locals.user = null;
  }
  next();
})

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'jade');
app.use(sass({
  dest: 'www/css',
  outputStyle: 'compressed',
  prefix: '/css',
  sourceMap: app.get('env') === 'production' ? 'false' : true,
  src: '../styles',
  force: true
}));

//makes the body available from post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('www'));

app.use('/user', require('./routes/user'))

app.use(function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.send(403, {redirect: true})
  }
})


app.use('/api', api);
// app.use('/', routes);


database.connect(onDbConnect);

function onDbConnect(err, db) {
  if (err) {
    console.error('Database Connection Error.' + err)
  } else {
    console.log('Database Connection Established at' + db.options.url);
    startNodeListener();
  }
}

function startNodeListener () {
  var server = app.listen(app.get('port'), function () {
    var port = server.address().port;
    var mode = app.get('env');

    console.log('Server listening on port ' + port + ' in ' + mode + ' mode...');
  });
}

// var port = process.env.PORT || 3000;

// app.listen(port);

module.exports = app;
