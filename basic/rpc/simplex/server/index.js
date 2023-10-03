const net = require('net');

const PORT = 7777;

const server = net.createServer(socket => {
    socket.on('data', buffer => {
        console.log(buffer.toString().trim());
    });
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}`);
});