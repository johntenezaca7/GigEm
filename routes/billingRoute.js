const keys = require('../config/keys');

const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin')


module.exports = app => {
	
  app.post('/api/stripe',requireLogin, async (req, res) => {
    // const charge = await stripe.charges.create({
    //   amount: 200,
    //   currency: 'usd',
    //   description: 'Commit to gig',
    //   source: req.body.id
    // });
    // req.user.credits += 5;
    // const user = await req.user.save();
    console.log('Payed!!')
        
    res.send('payed');
  });
}