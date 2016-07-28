exports.up = function(knex, Promise) {
    return knex.schema.createTable('users_episodes', function(table) {
        table.increments();
        table.integer('user_id').references('users.id');
        table.integer('itunes_episode_id');
        table.integer('user_podcast_id').references('users_podcasts.id');
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
