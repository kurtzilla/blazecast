exports.up = function(knex, Promise) {
    return knex.schema.createTable('episodes', function(table) {
        table.increments();
        table.integer('itunes_episode_id');
        table.integer('podcast_id').references('podcasts.id');
        table.string('name');
        table.string('feedUrl');
        table.integer('length');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('episodes');
};
