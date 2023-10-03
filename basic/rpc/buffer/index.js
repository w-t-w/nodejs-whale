const fs = require('fs');
const path = require('path');
const protobuf = require('protocol-buffers');

const PROTO_DIR = path.resolve(__dirname, './user.proto');

const {User} = protobuf(fs.readFileSync(PROTO_DIR, 'utf-8'));

const buffer1 = Buffer.from('hello nodejs!');
const buffer2 = Buffer.from([1, 2, 3, 4]);
const buffer3 = Buffer.alloc(4);

const user_o = {
    username: 'white-than-wood',
    age: 29,
    gender: true,
    hobby: {
        sports: 'basketball'
    }
};

console.log(buffer1);
console.log(buffer2);
console.log(buffer3);

console.log(buffer1.toString());
console.log(buffer2.readInt8());
buffer3.writeInt16BE(512, 2);
console.log(buffer3);
buffer3.writeInt16LE(512, 2);
console.log(buffer3);

const user_encode = User.encode(user_o);
console.log(user_encode);
const user_decode = User.decode(user_encode);
console.log(user_decode);

