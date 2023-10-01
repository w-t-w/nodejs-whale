const {age} = require('./cjs');
const user = require('./cjs');

console.log(age);
console.log(user);

const timer_first = setTimeout(() => {
    console.log(age);
    console.log(user);
    user.age = 16;
    clearTimeout(timer_first);
}, 1000);

const timer_second = setTimeout(() => {
    console.log(age);
    console.log(user);
    clearTimeout(timer_second);
}, 3000);