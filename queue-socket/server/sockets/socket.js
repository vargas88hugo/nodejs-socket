const { io } = require('../server');

io.on('connection', (client) => {
  console.log('User Connected');

  client.emit('sendMessage', {
    user: 'Administrator',
    message: 'Welcome to this app',
  });

  client.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Listen to the client
  client.on('sendMessage', (data, callback) => {
    console.log(data);

    client.broadcast.emit('sendMessage', data);

    // if (message.user) {
    //     callback({
    //         resp: 'TODO SALIO BIEN!'
    //     });

    // } else {
    //     callback({
    //         resp: 'TODO SALIO MAL!!!!!!!!'
    //     });
    // }
  });
});
