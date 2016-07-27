exports.up = function(knex, Promise) {
    return knex.schema.createTable('podcasts', function(table) {
        table.increments();
        table.integer('provider_id');
        table.string('provider_name');
        table.string('name');
        table.string('feedUrl');
        table.string('images');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('podcasts');
};
