// try {
//     interview(result => {
//         console.log(`smile!${result}`);
//     });
// } catch (err) {
//     console.error(`cry!${err.message}`);
// }
// function interview(callback) {
//     const timer = setTimeout(() => {
//         const result = Math.random();
//         if (result > 0.3) {
//             callback('success!');
//         } else {
//             throw new Error('failed!');
//         }
//         clearTimeout(timer);
//     }, 500);
// }

// try {
interview((err, result) => {
    if (err) return console.error(`cry!${err.message}`);
    console.log(`smile!${result}`);
});
// } catch (err) {
//     console.error(`cry!${err.message}`);
// }

function interview(callback) {
    const timer = setTimeout(() => {
        const result = Math.random();
        if (result > 0.3) {
            callback(null, 'success!');
        } else {
            callback(new Error('failed!'));
        }
        clearTimeout(timer);
    }, 500);
}