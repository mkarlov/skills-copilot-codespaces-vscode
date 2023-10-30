//Create web server
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');

//Set up the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Set up the static assets directories
app.use(express.static(path.join(__dirname, 'public')));

//Set up the routes
var routes = require('./routes/index');
app.use('/', routes);

//Listen on port 3000
http.listen(3000, function(){
	console.log('listening on *:3000');
});

//Create socket.io instance and listen on the http server
var io = require('socket.io')(http);

//Listen for socket connections and log it to the console
io.on('connection', function(socket){
	console.log('a user connected');
	
	//Listen for a new comment and broadcast it to all other users
	socket.on('new comment', function(msg){
		console.log('new comment: ' + msg);
		io.emit('new comment', msg);
	});
	
	//Listen for a user disconnecting and log it to the console
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});