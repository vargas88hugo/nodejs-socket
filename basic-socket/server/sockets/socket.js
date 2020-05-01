const { io } = require('../server');

io.on('connection', (client) => {
  console.log('User connected');

  client.emit('sendMessage', {
    user: 'Admin',
    message: 'Welcome to my app!',
  });

  client.on('disconnect', () => {
    console.log('User disconnected');
  });

  client.on('sendMessage', (obj, callback) => {
    console.log(obj);

    if (obj.user) {
      callback({
        message: 'Everything is good',
      });
    } else {
      callback({
        message: 'Everything is wrong',
      });
    }
  });
});
