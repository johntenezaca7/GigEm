import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Publish from './publishKey';

 
//props handleToken can be found in the actions folder
//it  sends an axios post to the backend, can be found in the file billing routes

//main challenge is to update the gig if the user has payed a certain mount, so the use sees that they have already payed
//All while increases the progress bar of the gig and persiting data

// create new file called publishKey.
// module.exports ={
//     key: check slack
// } 

//use dummy email
//credit card # a bunch of 42424242424242424242424
//should console.log payed
class Payments extends Component {
    render(){
        
        return(
            <StripeCheckout 
                name="Gig'em "
                description="Support this gig with $2!"
                amount={200}
                token={token =>{this.props.handleToken(token)}}
                stripeKey = {Publish.key} >
         
            </StripeCheckout>
        );
    }
};


export default connect(null, actions)(Payments);