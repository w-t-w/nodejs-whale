(async () => {
    try {
        await interview(1);
        await interview(2);
        await interview(3);
        await interview(4);
    } catch (err) {
        return console.log(`cry at ${err.round} round!`);
    }
    console.log('smile!');
})();


function interview(round) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            const random = Math.random();
            if (random > 0.3) {
                resolve('success!');
            } else {
                const error = new Error('failed!');
                error.round = round;
                reject(error);
            }
            clearTimeout(timer);
        }, 800);
    });
}