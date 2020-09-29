'use strict';
const faker = require('faker');

const io = require('socket.io-client');

const vendorSocket = io.connect('http://localhost:3000/caps');

const store = '1-206-flowers'
vendorSocket.emit('join', store);

vendorSocket.on('delivered', (payload) => {
    console.log(`THANK YOU FOR DELIVERING ${payload.orderID}`);
})

setInterval(function sendMessage() {
    var obl = {
        store: store,
        orderID: faker.random.uuid(),
        customer: faker.name.findName(),
        address: `${faker.address.city()} , ${faker.address.stateAbbr()}`,
    }
    vendorSocket.emit('pickup', obl);

}, 5000);