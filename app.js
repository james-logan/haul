var express = require('express');
var app = express();

var sass = require('node-sass-middleware')

var bodyParser = require('body-parser');
var routes = require('./routes/routes')

app.set('view engine', 'jade')
app.use(sass({
  dest: 'www/css',
  outputStyle: 'compressed',
  prefix: '/css',
  sourceMap: app.get('env') === 'production' ? 'false' : true,
  src: 'styles',
  force: true
}));

//makes the body available from post requests
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('www'))


app.use('/', routes)

var port = process.env.PORT || 3000;

app.listen(port)

module.exports = app
