// var config = require('../knexfile');
// var knex = require('knex')(config);
var knex = require('../db/knex');
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('virtuals');
bookshelf.plugin('visibility');

knex.migrate.latest();

module.exports = bookshelf;
