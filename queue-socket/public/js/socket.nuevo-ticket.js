const socket = io();

const label = $('#lblNuevoTicket');

socket.on('connect', () => console.log('Conectado con el servidor'));
socket.on('disconnect', () => console.log('Desconectado con el servidor'));

socket.on('estadoActual', (data) => {
  console.log(data.actual);
  label.text(data.actual);
});

$('button').on('click', () => {
  socket.emit('siguienteTicket', null, (siguienteTicket) => {
    label.text(siguienteTicket);
  });
});
