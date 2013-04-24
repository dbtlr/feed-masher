var path = require('path');

exports.public = function(app, express) {
  console.log(__dirname);
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/../app/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('is it secret? is it safe?'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/../public'));
  app.use(express.static(path.join(__dirname, '../public')));

  // development only
  if (app.get('env') == 'development') {
    app.use(express.errorHandler());
  }
}


exports.process = function() {
  
}
