
/**
 * Module dependencies.
 */

require("coffee-script");

var express = require('express');
var routes = require('./routes/labo_a_completer');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.accueil);
app.get('/cours', routes.liste_cours);
app.get('/cours/:sigle', routes.voir_cours);
app.get('/cours/:sigle/modifier', routes.modifier_cours);
app.post('/cours/:sigle/modifier', routes.modifier_cours_post);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
