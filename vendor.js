'use strict';

require('dotenv').config();
const events = require('./events');
const storeName = process.env.STORE_NAME;
const faker = require('faker');
generateOrder();

// let newOrder = setTimeout(generateOrder, 5000);

function generateOrder(){
  setTimeout(()=> {
    let randomName = faker.name.findName();
    let randomID = faker.random.number();
    let randomAddress = faker.address.streetAddress('###');
    let order = {
      storeName: storeName,
      orderId: randomID,
      customerName: randomName,
      address: randomAddress,
    };
    events.emit('pickup', order);
    generateOrder();
  }, 5000 );
}

events.on('delivered', (payload)=>thankLogger(payload));

function thankLogger(){
  console.log('Thank you!');
}

module.exports = thankLogger;