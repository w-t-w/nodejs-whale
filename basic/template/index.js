const vm = require('vm');
const user = {
    name: 'wtw',
    age: 29,
    hobby: {
        sports: 'basketball'
    }
};
console.log(`I\'m ${user.name}, ${user.age} year\'s old, I love ${user.hobby.sports}!`);
const result = vm.runInNewContext("`I\'m ${user.name}, ${user.age} year\'s old, I love ${user.hobby.sports}!`", {user});
console.log(result);
const templateContext = {
    user,
    _(value) {
        if (!value) return '';
        return value.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;')
    },
    include(name) {
        return template[name]();
    }
};
let template = {
    templateA: '<p>${include("templateB")}</p>',
    templateB: '<h1>I\'m ${user.name}, ${user.age} year\'s old, I love ${user.hobby.sports}!</h1>'
};

Object.entries(template).forEach(([key, value]) => {
    template[key] = vm.runInNewContext(`(function () {
        return \`${value}\`;
    })`, templateContext);
});
const total_result = template['templateA']();
console.log(total_result);
