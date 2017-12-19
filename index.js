const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const db = require('./db'); 
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
var http = require('http');
var server = http.createServer();
var socket_io = require('socket.io');

require('./services/passport');

// const connections = [];
// const users = [];

// server.listen(3050);
// var io = socket_io();
// io.attach(server);

// io.on('connection', function(socket){

//   connections.push(socket)
//   console.log('Connected : %s sockets connected', connections.length);

//   socket.on('action', (action) => {
// 	//   console.log('the action', action)
// 	  if(action.type === 'server/hello'){

// 	  console.log(socket.id + ' says.. ' + action.data);
// 	  io.sockets.emit('action', {type:'message', data: action.data});
// 	  }
// 	})
  
//   socket.on('disconnect', function(data){
// 	  connections.splice(connections.indexOf(socket), 1);
// 	  console.log('Disconnected: %s sockets connected', connections.length)
// 	})

// 	// socket.on('send message', function(data){
// 	// 	console.log('getting to the back', data)
// 	// 	io.sockets.emit('new message', {msg: data})
// 	// });

// //   });


// });

var app = express();


app.use(bodyParser.json());


app.use(cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

// remove when sequlize is updated
require('./twilioSMS')(app)
require('./nodeMailer')(app)
require('./routes/authRoute')(app)
require('./routes/billingRoute')(app)
require('./routes/venueRoute')(app, db)
require('./routes/eventRoute')(app, db)
require('./routes/profileRoute')(app, db)
require('./routes/propertiesRoute')(app, db)

if (process.env.NODE_ENV === 'production') {
	//Express will serve up production assets like out main.js file, or main.css file!
	app.use(express.static('client/build'));
  
	//Express will serve up the index.html file if it doesn't recognize the route!
	const path = require('path');
	app.get('*', (req, res) => {
		console.log('TESTING PROD')
		res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
	});
}


let frontRoute = function (req, res) {
	//console.log(path.join(__dirname, '/../react-client/dist/', 'index.html'));
	res.sendFile(path.join(__dirname, '/../react-client/dist/', 'index.html'));
};
// app.get('/*', frontRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server running on ' + PORT)
})
