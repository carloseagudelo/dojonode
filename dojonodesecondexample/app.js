var express = require('express');
var bodyParser = require('body-parser');
var routes = require ('./routes');

var app = express();

app.listen(8989, function(){
	console.log("Puesto 8989 escuchando");
});

app.use(bodyParser.urlencoded({extend: true}));
app.use('/', routes);

