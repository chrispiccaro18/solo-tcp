const net = require('net');

const server = net.createServer(socket => {
  console.log('client connected');
  socket.on('data', data => {
    console.log(`${socket} says: ${data.toString()}`);
    socket.write(`Echo from server: ${data}`);
  });

  socket.on('end', () => {
    console.log('client disconnected');
  });
});

server.listen(7890, () => {
  console.log('Server listening on 7890');
});

