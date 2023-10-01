const GeekTime = require('./geekTime');

const geek_time = new GeekTime();

geek_time.on('new_lessons', price => {
    if (price <= 80) {
        console.log(`buy!the lesson's price is $${price}!`);
    } else {
        console.log('It\'s too expensive!');
    }
});