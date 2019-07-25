var express = require('express')
var app = express();
var http = require('http');


var mysql = require('mysql')


var myConnection  = require('express-myconnection')

var config = require('./config')
var dbOptions = {
	host:	  config.host,
	user: 	  config.user,
	password: config.password,
	port: 	  config.port, 
	database: config.db
}

var allowCrossDomain = function (req, res, next) {
    // console.log(req.body);
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, if-none-match, x-access-token, Authorization');
    res.header("Access-Control-Expose-Headers", "Etag, Authorization, Origin, X-Requested-With, Content-Type, Accept, If-None-Match, Access-Control-Allow-Origin");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};
app.use(allowCrossDomain);
app.set('view engine','ejs')
app.use(myConnection(mysql, dbOptions, 'request'));
fileUpload = require('express-fileupload');
app.use(fileUpload());

var index = require('./routes/index');
app.use(require('express-domain-middleware'));
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', index)
var server = http.createServer(app)
  server.listen(config.APPLICATION_PORT);

