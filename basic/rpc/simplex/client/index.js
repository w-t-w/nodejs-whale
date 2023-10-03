const net = require('net');

const HOST = '127.0.0.1',
    PORT = 7777;

const socket = new net.Socket();

socket.connect({
    host: HOST,
    port: PORT,
    keepAlive: true
});

socket.write('hello nodejs!!!');

