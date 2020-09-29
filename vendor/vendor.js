'use strict';

require('dotenv').config();
// const events = require('../events');
const storeName = process.env.STORE_NAME;
const faker = require('faker');
const net = require('net');
const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;


client.connect(PORT, HOST, () => {
  console.log('vendor connected');
  generateOrder();
  client.on('data', (data) => {
    const event = JSON.parse(data);
    if (event.event === 'delivered') {
      thankLogger();
    }
  })
});

client.on('error', (err) => console.log('Vendor Error ', err.message));

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
    const message = JSON.stringify({
      event:'pickup',
      payload:order
    });
    client.write(message);
    generateOrder();
  }, 5000 );
}

function thankLogger(){
    console.log('Thank you!');
}

client.on('close', function() {
  console.log('Connection got closed');
});

module.exports = thankLogger;