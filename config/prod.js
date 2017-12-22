module.exports = {
    dbHost: process.env.DB_HOST,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    cookieKey: process.env.COOKIE_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    firebase: {
        apiKey: process.env.FB_API_KEY,
        authDomain: process.env.FB_AUTH_DOMAIN,
        databaseURL: process.env.FB_DB_URL,
        projectId: process.env.FB_PROJ_ID,
        storageBucket: process.env.FB_STORE_BUCKET,
        messagingSenderId: process.env.FB_MESS_SEND_ID
    },
    mailer: {
    user: process.env.MAILER_U,
    pass: process.env.MAILER_PW
    },
    twilioMess: {
    accountSID: process.env.TWILIO_SID,
    authToken: process.env.TWILIO_TOKEN
    }
}

