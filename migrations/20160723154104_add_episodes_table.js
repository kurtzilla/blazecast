exports.up = function(knex, Promise) {
    return knex.schema.createTable('episodes', function(table) {
        table.increments();
        table.integer('podcast_id').references('podcasts.id');
        table.string('name');
        table.integer('length');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('episodes');
};
