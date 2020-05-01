const socket = io();
socket.on('connect', () => console.log('Connected to the server'));
socket.on('disconnect', () => console.log('Disconnected to the server'));
socket.emit(
  'sendMessage',
  {
    user: 'Hugo Vargas',
    message: 'Hello World',
  },
  (resp) => console.log(`Server response: ${resp.message}`)
);
socket.on('sendMessage', (obj) => console.log(obj));
