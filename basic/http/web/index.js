const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 7777;

const TEMPLATE_DIR = path.resolve(__dirname, './index.html');

const server = http.createServer((req, res) => {
    const url = req.url;
    if (url === '/favicon.ico') {
        res.writeHead(200);
        res.end('');
        return false;
    }
    res.writeHead(200);
    fs.createReadStream(TEMPLATE_DIR, 'utf-8').pipe(res);
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});