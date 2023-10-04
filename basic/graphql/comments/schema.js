const {buildSchema} = require('graphql');
const path = require('path');
const fs = require('fs');
const comments = require('../data/comments');

const GRAPHQL_DIR = path.resolve(__dirname, '../gql/comments.gql');

const schema = buildSchema(fs.readFileSync(GRAPHQL_DIR, 'utf-8'));

schema.getQueryType().getFields().comments.resolve = () => {
    return comments;
};

module.exports = schema;