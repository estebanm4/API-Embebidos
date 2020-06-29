var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config/config');
var port = process.env.PORT || 5000;

var app = express();

var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(passport.initialize());
var passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);

app.get('/', function(req, res){
	return res.send('Hello!, The API is at http://localhost:' + port + '/api');
});

var routes = require('./routes.js');
app.use('/api', routes);

mongoose.connect(config.db, { useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('MongoDB database connection established successfully!');
});

connection.on('error', (err) => {
	console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
	process.exit();
});

app.listen(port);
console.log('There will be dragons: http://localhost:' + port);