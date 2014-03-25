
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var config = require("./config");

var app = express();

//log
var fs = require('fs');
var accessLogFile = fs.createWriteStream('access.log', {flags: 'a'});
app.use(express.logger({stream: accessLogFile}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/action1', routes.action1);
app.get('/action2/:year/:month/:day', routes.action2);
app.get('/action3*', routes.action3);
app.get('/action4', routes.action4);
app.get('/action5', routes.action5);
app.get('/action6*', routes.action6);
app.get('/action7', routes.action7);
app.get('/action8', routes.action8);
app.get('/action9', routes.action9);
app.get('/action10/:year/:month/:day', routes.action10);
app.get('/action11/:activityID', routes.action11);
app.get('/action12/:year/:month/:day', routes.action12);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
