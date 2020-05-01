const socket = io();

socket.on('connect', () => console.log('Conectado con el servidor'));
socket.on('disconnect', () => console.log('Desconectado con el servidor'));
