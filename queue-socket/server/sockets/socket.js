const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

io.on('connection', (client) => {
  const ticketControl = new TicketControl();
  client.on('siguienteTicket', (data, callback) => {
    let siguiente = ticketControl.siguiente();

    console.log(siguiente);
    callback(siguiente);
  });

  client.emit('estadoActual', {
    actual: ticketControl.getUltimoTicket(),
    ultimos4: ticketControl.getUltimos4(),
  });

  client.on('atenderTicket', (data, callback) => {
    if (!data.escritorio) {
      return callback({
        err: true,
        mensaje: 'El escritorio es necesario',
      });
    }

    let atenderTicket = ticketControl.atenderTicket(data.escritorio);

    callback(atenderTicket);
  });
});
