interview(1)
    .then(() => interview(2))
    .then(() => interview(3))
    .then(() => interview(4))
    .then(() => console.log('smile!'))
    .catch(err => {
        console.log(`cry at ${err.round} round!`);
    });

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
        }, 1000);
    });
}