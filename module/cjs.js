exports.name = 'w-t-w';
exports.age = 29;
exports.gender = true;
exports.hobby = {
    sports: 'basketball'
};

// const timer = setTimeout(() => {
//     console.log(exports.age);
//     console.log(exports);
//     exports.age = 20;
//     clearTimeout(timer);
// }, 2000);

module.exports = {
    name: 'white-than-wood',
    age: 30,
    gender: false,
    hobby: {
        sports: 'football'
    }
};

const timer = setTimeout(() => {
    console.log(exports.age);
    console.log(exports);
    console.log(module.exports.age);
    console.log(module.exports);
    module.exports.age = 40;
    clearTimeout(timer);
}, 2000);