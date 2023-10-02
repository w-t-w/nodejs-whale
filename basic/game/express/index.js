const express = require('express');
const path = require('path');
const fs = require('fs');

const game = require('./game');

const TEMPLATE_DIR = path.resolve(__dirname, './index.html');

const PORT = 7777;

const player_won_random = 1,
    result_selection = {
        '-1': '你输了!',
        0: '平局!',
        1: '你赢了!'
    };

let player_won_count = 0,
    player_last_action = null,
    same_count = 0;

const app = express();

app.get('/favicon.ico', (request, response) => {
    response.status(200);
    response.send('');
    return true;
});

app.get('/game', (request, response, next) => {
    const {query: {action}} = request;
    if (typeof action === 'undefined') {
        response.status(400);
        response.send('');
        return false;
    }
    if (player_won_count >= 3 || same_count === 9) {
        response.status(500);
        response.send('你太厉害了!我不跟你玩儿了!');
        return false;
    }
    next();
    if (response.player_won)
        player_won_count++;
}, (request, response, next) => {
    const {query: {action}} = request;
    if (player_last_action && player_last_action === action) {
        same_count++;
        if (same_count >= 3) {
            same_count = 9;
            response.status(500);
            response.send('你作弊!');
            return false;
        }
    } else {
        same_count = 0;
    }
    player_last_action = action;
    next();
}, (request, response) => {
    const {query: {action}} = request;
    const result_random = game(action),
        result = result_selection[result_random];
    // const timer = setTimeout(() => {
    if (result_random === player_won_random) {
        response.player_won = true;
    }
    // clearTimeout(timer);
    response.status(200);
    response.send(result);
    // }, 500);
});

app.get('/', (request, response) => {
    response.status(200);
    response.send(fs.readFileSync(TEMPLATE_DIR, 'utf-8'));
});

app.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});