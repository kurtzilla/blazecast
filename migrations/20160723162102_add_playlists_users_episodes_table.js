exports.up = function(knex, Promise) {
    return knex.schema.createTable('playlists_users_episodes', function(table) {
        table.increments();
        table.integer('playlist_id').references('playlists.id');
        table.integer('user_episode_id').references('users_episodes.id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('playlists_users_episodes');
};
