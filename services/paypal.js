let paypal = require('paypal-rest-sdk');
// console.log(paypal);
const hostname = 'http://localhost:3000'


var ordersArray = [];

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AUWaOHhkNtMhC1QJy7FhYlgic7iNElARvWQY8Id6gYofsBJMrk3J8xkx_7PTA3AgNNGxUHw4d6EKRCHF',
    'client_secret': 'EBgzea4fTdO_RY1apQh2xaPPZyNlUZfBU4g6vAxd3YgyWV8F4TXL_4zlHebEHt9qECPaapbK5vt84ERd',
    'headers' : {
      'custom': 'header'
    }
});

var generateCustomerOrderLink = function(selectedEvent, selectedUser) {
    var create_payment_json = {
        "intent": "order",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": hostname,
            "cancel_url": hostname
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": `${selectedEvent.name} - ${selectedEvent.description}`,
                    "sku": "Commit",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "This is the payment description."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            //ordersArray.push(payment.id);
        }
    })
}

var checkOrders = function(ordersArray) {
    let orderId = 'PAY-87468632Y1510822TLIYGY6A';

    paypal.order.get(orderId, function (error, order) {
        if (error) {
            console.log('=======================');
            console.log(error);
            console.log('=======================');
            //throw error;
        } else {
            console.log("Get Order Response");
            console.log(JSON.stringify(order));
        }
    });   
}

var chargeUsers = function(attendance, users, events, gigId) {
  if (!Array.isArray(attendance)) attendance = [attendance];   // if there's only one entry, we receive
  if (!Array.isArray(users)) users = [users];  // an object, not an array. We need consistency.
  if (!Array.isArray(events)) events = [events];

  let selectedEvent = (events.filter((x) => x.id === gigId))[0].dataValues;
  let attendanceArray = (attendance.map((x) => x = x.UserId));
  let selectedUsers = (users.filter((x) => attendanceArray.includes(x.id)).map((x) => x = x.dataValues));

  selectedUsers.forEach((selectedUser) => generateCustomerOrderLink (selectedEvent, selectedUser));
}

module.exports = { chargeUsers, checkOrders }