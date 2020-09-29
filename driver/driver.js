'use strict';
// const events = require('../events');
const net = require('net');
const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;


client.connect(PORT, HOST, () => {
  console.log('driver connected'); 
  // client.on('pickup', pickUpLogger);
  client.on('data', (data) => {
    const event = JSON.parse(data);
    if (event.event === 'pickup') {
      pickUpLogger(event.payload);
    }
  });
});

client.on('error', (err) => console.log(`Driver Client error ${err.message}`));


function pickUpLogger(payload){
  setTimeout(()=> {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    const message = JSON.stringify({
      event:'in-transit',
      payload:payload,
    });
    client.write(message);
    // events.emit('in-transit', payload);
    setTimeout(()=>{
      console.log(`DRIVER: delivered ${payload.orderId}`);
      const message = JSON.stringify({
        event:'delivered',
        payload:payload,
      });
      client.write(message);
      // events.emit('delivered', payload);
    }, 3000);

  }, 1000);
}

client.on('close', function() {
  console.log('Connection got closed');
});

module.exports = pickUpLogger;