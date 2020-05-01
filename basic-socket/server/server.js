const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();
const server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

const io = socketIO(server);
io.on('connection', (client) => {
  console.log('User connected');

  client.on('disconnect', () => {
    console.log('User disconnected');
  });

  client.on('sendMessage', (obj) => console.log(obj));
});

server.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log(`Server running on ${port}`);
});
