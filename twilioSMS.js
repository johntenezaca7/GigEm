var twilio = require('twilio');
const config = require('./config/dbconfig')

var accountSid = config.twilioMess.accountSID; // Your Account SID from www.twilio.com/console
var authToken = config.twilioMess.authToken;   // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello from GigEm again',
    to: '+15129208543 ',  // Text this number
    from: '+16018909041' // From a valid Twilio number
})
.then((message) => console.log("Text data back: ", message.sid));