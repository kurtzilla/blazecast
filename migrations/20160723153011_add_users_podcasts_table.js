exports.up = function(knex, Promise) {
    return knex.schema.createTable('users_podcasts', function(table) {
        table.increments();
        table.integer('user_id').references('users.id');
        table.integer('podcast_id').references('podcasts.id');
        table.boolean('follow');
        table.integer('rating');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users_podcasts')
};
