const path = require('path');
const fs = require('fs');
const {graphql, buildSchema} = require('graphql');

const GRAPHQL_PATH = path.resolve(__dirname, '../gql/hello.gql');

const rootValue = {
    hello() {
        return 'hello,graphql';
    }
};

const source = '{ hello }';

const schema = buildSchema(fs.readFileSync(GRAPHQL_PATH, 'utf-8'));

graphql({schema, source, rootValue})
    .then(result => {
        console.log(result.data.hello);
    });