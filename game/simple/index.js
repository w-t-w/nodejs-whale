const default_argv_num = 2;

const argv = process.argv,
    argv_length = argv.length,
    argv_input = argv[argv_length - 1];

const selection = ['rock', 'scissors', 'paper'],
    selection_length = selection.length;

const player_action = (argv_length > default_argv_num && selection.includes(argv_input)) ? argv_input : 'rock';

const computer_random = Math.floor(Math.random() * selection_length),
    computer_action = selection[computer_random];

function differentActionJudgement(player, computer) {
    let player_index = null;
    for (let [key, value] of selection.entries()) {
        if (player === value) {
            player_index = key;
            break;
        }
    }
    if (player_index === selection_length - 1)
        player_index = -1;
    return computer === selection[++player_index];
}

console.log('剪刀、石头、布游戏正式开始!');
console.log(`电脑的手势: ${computer_action}, 您的手势: ${player_action}`);
if (computer_action === player_action) {
    console.log('平局!');
} else if (differentActionJudgement(player_action, computer_action)) {
    console.log('你赢了!');
} else {
    console.log('你输了!');
}