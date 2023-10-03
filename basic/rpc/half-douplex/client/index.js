const net = require('net');

const HOST = '127.0.0.1',
    PORT = 7777,
    seq_length = 2,
    package_length = 4;

const lessonIds = [
        "136797",
        "136798",
        "136799",
        "136800",
        "136801",
        "136803",
        "136804",
        "136806",
        "136807",
        "136808",
        "136809",
        "141994",
        "143517",
        "143557",
        "143564",
        "143644",
        "146470",
        "146569",
        "146582"
    ],
    lessonIds_length = lessonIds.length;

let id = null,
    seq = 0,
    index = null,
    buffer = null;

const socket = new net.Socket();

socket.connect({
    host: HOST,
    port: PORT,
    keepAlive: true
});

index = Math.floor(Math.random() * lessonIds_length);
id = lessonIds[index];
socket.write(encode(id));

socket.on('data', data => {
    buffer = (buffer && buffer.length) ? Buffer.concat([buffer, data]) : data;
    const seq = buffer.readInt16BE();
    const body = buffer.slice(seq_length);
    const result = body.toString().trim();
    console.log(`课程下标为 ${index + 1} 的包头为 ${seq + 1} 课程 id 为 ${id} 的课程名称为 ${result}!`);
    buffer = null;

    index = Math.floor(Math.random() * lessonIds_length);
    id = lessonIds[index];
    socket.write(encode(id));
});

function encode(id) {
    const header = Buffer.alloc(seq_length);
    console.log(`课程下标为 ${index + 1} 的包头为 ${seq + 1} 课程 id 为 ${id}!`);
    header.writeInt16BE(seq++);
    const body = Buffer.alloc(package_length);
    body.writeInt32BE(id);
    return Buffer.concat([header, body]);
}





