const { io } = require('../server');

io.on('connection', (client) => {
  console.log('Usuario Conectado');

  client.emit('enviarMensaje', {
    Usuario: 'Administrador',
    mesanje: 'Bienvenido a la app',
  });

  client.on('disconnect', () => {
    console.log('Usuario Desconectado');
  });

  // Listen to the client
  client.on('enviarMensaje', (data, callback) => {
    console.log(data);

    client.broadcast.emit('enviarMensaje', data);

    // if (mesanje.Usuario) {
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
