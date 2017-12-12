module.exports = (app) => {

const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "gigemnews@gmail.com", // generated ethereal user
        pass: "gignation11"  // generated ethereal password
    }
});

app.post('/sendEmail', (req, res) => {
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"GigEm GigsYou 👻" <foo@blurdybloop.com>', // sender address
        to: 'bigdmcb@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Did you just get an email from GigEm? Yur ya durd', // plain text body
        html: '<b>Did you just get an email from GigEm? Yur ya durd</b>' // html body
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('index');
    });
})

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// nodemailer.createTestAccount((err, account) => {

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true, // true for 465, false for other ports
//         auth: {
//             user: "gigemnews@gmail.com", // generated ethereal user
//             pass: "gignation11"  // generated ethereal password
//         }
//     });


//     // setup email data with unicode symbols
//     let mailOptions = {
//         from: '"GigEm GigsYou 👻" <foo@blurdybloop.com>', // sender address
//         to: 'bigdmcb@gmail.com, tommy.york@gmail.com', // list of receivers
//         subject: 'Hello ✔', // Subject line
//         text: 'Did you just get an email from GigEm? Yur ya durd', // plain text body
//         html: '<b>Did you just get an email from GigEm? Yur ya durd</b>' // html body
//     };

//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//         // Preview only available when sending through an Ethereal account
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
//         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//     });
// });
}