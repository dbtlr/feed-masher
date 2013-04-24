/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./config/routes')
  , http = require('http')
  , environment = require('./config/environment');

var app = express();

environment.public(app, express);
routes.handler(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
