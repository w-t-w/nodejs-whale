const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const Koa_mount = require('koa-mount');
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

const koa = new Koa();
const game_koa = new Koa();

koa.use(async (ctx, next) => {
    const {request, response} = ctx;
    const {url} = request;
    if (url === '/favicon.ico') {
        response.status = 200;
        response.body = '';
        return true;
    }
    await next();
});

koa.use(Koa_mount('/game', game_koa));

koa.use(Koa_mount('/', ctx => {
    const {response} = ctx;
    response.status = 200;
    response.body = fs.readFileSync(TEMPLATE_DIR, 'utf-8');
}));

game_koa.use(async (ctx, next) => {
    const {request, response} = ctx;
    const {query: {action}} = request;

    if (typeof action === 'undefined') {
        response.status = 400;
        response.body = '';
        return false;
    }

    if (player_won_count >= 3 || same_count === 9) {
        response.status = 500;
        response.body = '你太厉害了!我不跟你玩儿了!';
        return false;
    }

    await next();

    if (ctx.player_won)
        player_won_count++;
});

game_koa.use(async (ctx, next) => {
    const {request, response} = ctx;
    const {query: {action}} = request;
    if (player_last_action && player_last_action === action) {
        same_count++;
        if (same_count >= 3) {
            same_count = 9;
            response.status = 500;
            response.body = '你作弊!';
            return false;
        }
    } else {
        same_count = 0;
    }
    player_last_action = action;
    await next();
});

game_koa.use(async ctx => {
    const {request, response} = ctx;
    const {query: {action}} = request;
    await new Promise(resolve => {
        const timer = setTimeout(() => {
            const result_random = game(action),
                result = result_selection[result_random];

            if (result_random === player_won_random)
                ctx.player_won = true;

            response.status = 200;
            response.body = result;
            resolve();
            clearTimeout(timer);
        }, 600);
    });
});

koa.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});