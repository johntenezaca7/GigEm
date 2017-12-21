const config = require('./config/dbconfig')

module.exports = (app) => {

    var twilio = require('twilio');
    

var accountSid = config.twilioMess.accountSID; // Your Account SID from www.twilio.com/console
var authToken = config.twilioMess.authToken;   // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);


    

app.post('/api/sendText', (req, res) => {
    console.log("SENDING TEXT REQ.BODY: ", req.body)
    client.messages.create({
        body: `Hey, its GigEm. You created ${req.body.info.eventName}. Cant get replies yet tho 👻. Love`,
        to: `+1${req.body.info.phone}`,  // Text this number .. +15129208543 .. dad 12149577112
        from: '+16018909041' // From a valid Twilio number
    })
    .then((message) => console.log("Text data back: ", message.sid));
})

};