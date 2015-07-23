var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	port = process.env.PORT || 8080,
	User = require('./app/models/user');
//connect to our database
mongoose.connect('mongodb://localhost:27017/myDatabase');
//App configuration--use body parser for post request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//configure app to handle CORS requests

app.use(function(req,res,next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
	 Authorization');
	next();

})
//log all requests to console.
app.use(morgan('dev'));

//basic route for the homepage

app.get('/', function(req, res) {
	res.send('hello welcome to HP!')
})

//get instance of the express router
var apiRouter = express.Router();


//middleware to use for all requests and where we will authenticate users

apiRouter.use(function(req,res,next) {
	console.log('somebody just came to our app!');
	next();
})
//test route at localhost:8080/api

apiRouter.get('/', function(req,res) {
	res.json({message:'hooray! welcome to our api!'})
})

//register our routes with prefix '/api'
app.use('/api', apiRouter);

//start server 

app.listen(port);
console.log('magic happens on port' + port)


