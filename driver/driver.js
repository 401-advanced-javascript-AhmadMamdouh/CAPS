'use strict';

const io = require('socket.io-client');

const driverSocket = io.connect('http://localhost:3000/caps');

driverSocket.on('pickup', (payload) => {

  setTimeout(() => {
    console.log(`picked up ${payload.orderID}`);
    driverSocket.emit('in-transit', payload);
  }, 1000);
  setTimeout(() => {
    console.log(`delivered ${payload.orderID}`);
    driverSocket.emit('delivered', payload);
  }, 3000);
});