const game = require('./game');

const player_won_number = 1;

let player_won_count = 0;

console.log('请输入您的手势:(rock、scissors or paper)');
process.stdin.on('data', data => {
    if (player_won_count >= 3) {
        console.log('你太厉害了!我不跟你玩儿了!');
        process.exit(1);
    }

    const player_action = data.toString().trim();
    const result = game(player_action);

    if (result === player_won_number)
        player_won_count++;

    console.log('请输入您的手势:(rock、scissors or paper)');
});