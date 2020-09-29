'use strict';

const { Socket } = require('socket.io-client');

const io = require('socket.io')(3000);

io.on('connection',(socket)=>{
  console.log(`CONNECTED ${socket.id}`);
});

const caps = io.of('/caps');
caps.on('connection', (socket)=>{
  console.log('WELCOME Dear Customer');
  console.log(`CONNECTED ${socket.id}`);

  socket.on('join',(room)=>{
    console.log('register as :',room);
    socket.join(room);
  });

  socket.on('pickup', (payload) => {
    render('pickup', payload);
    caps.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    render('in-transit', payload);
    caps.to(payload.store).emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    render('delivered', payload);
    caps.to(payload.store).emit('delivered', payload);
  });
});

function render(event, payload) {
  let time = new Date();
  console.log({ event, payload, time });

}

// const net = require('net');
// const PORT = process.env.PORT || 3000;
// const uuidv4 = require('uuid').v4;

// const server = net.createServer();

// server.listen(PORT,()=> console.log(`The server is up on PORT ${PORT}`));
// const socketPool = {};

// server.on('connection', (socket)=> {
//   const id = `socket-${uuidv4()}`;
//   socketPool[id] = socket;
//   socket.on('data', (buffer)=> dispatchEvent(buffer));  
// });
// function dispatchEvent(buffer) {
//   const data = JSON.parse(buffer.toString().trim());
//   let verfication=0;
//   Object.keys(data).forEach(key=> {
//     if(key==='payload'){
//       verfication++;
//     }
//     if(key === 'event'){
//       verfication++;
//     }
//   });
//   if (verfication ===2){
//     broadcast(data);
//   }
// }
// function broadcast(data) {
//   const payload = JSON.stringify(data);
//   // console.log('Payload', payload);
//   for (let socket in socketPool) {
//     socketPool[socket].write(payload); 
//   }
//   logger(data.event, data.payload);
// }

// function logger(event, payload){
//   const time = new Date();
//   console.log({event, time, payload});
// }

// server.on('error', (e) => console.log('Caps SERVER ERROR', e.message));

// module.exports = logger;