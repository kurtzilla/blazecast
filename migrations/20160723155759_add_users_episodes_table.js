exports.up = function(knex, Promise) {
    return knex.schema.createTable('users_episodes', function(table) {
        table.increments();
        table.integer('user_podcast_id').references('users_podcasts.id');
        table.integer('episode_id').references('episodes.id');
        table.integer('rating');
        table.float('progress');
        table.boolean('unplayed');
        table.boolean('favorite');
        table.boolean('save_for_later');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users_episodes');
};
