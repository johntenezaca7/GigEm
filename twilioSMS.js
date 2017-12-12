const config = require('./config/dbconfig')

module.exports = (app) => {

    var twilio = require('twilio');
    

var accountSid = config.twilioMess.accountSID; // Your Account SID from www.twilio.com/console
var authToken = config.twilioMess.authToken;   // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);


    

app.post('/api/sendText', (req, res) => {
    client.messages.create({
        body: 'Hey Stuart, its Dylan. Our website can send text messages. Cant get replies yet tho 👻. Love',
        to: '+15129208543 ',  // Text this number .. +15129208543 .. dad 12149577112
        from: '+16018909041' // From a valid Twilio number
    })
    .then((message) => console.log("Text data back: ", message.sid));
})

};