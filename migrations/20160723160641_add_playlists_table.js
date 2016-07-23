exports.up = function(knex, Promise) {
    return knex.schema.createTable('playlists', function(table) {
        table.increments();
        table.integer('user_id').references('users.id');
        table.string('name');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('playlists');
};
