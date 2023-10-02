const loop = {
    leak: [],
    init() {
        while (this.leak.length) {
            const callback = this.leak.shift();
            callback();
        }
        const timer = setTimeout(() => {
            this.init();
            clearTimeout(timer);
        }, 1000);
    },
    addEventListener(callback) {
        this.leak.push(callback);
    }
};
loop.init();
loop.addEventListener(() => {
    console.log('time first loop!');
});
setTimeout(() => {
    loop.addEventListener(() => {
        console.log('time loop again!');
    });
}, 4000);
setTimeout(() => {
    loop.addEventListener(() => {
        console.log('time loop third!');
    });
}, 7000);