
if (process.env.NODE_ENV === 'production') {
    //We are in production
    console.log('WE ARE IN PRODUCTION')
    module.exports = require('./prod')
} else {
    //We are in development
    console.log('WE ARE IN DEV')
    module.exports = require('./dev');
}


