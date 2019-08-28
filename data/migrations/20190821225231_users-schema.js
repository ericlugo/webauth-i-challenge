exports.up = function(knex) {
  return knex.schema.createTable(`user`, (tbl) => {
    tbl.increments(`user_id`);
    tbl.string(`user_name`, 128).notNullable();
    tbl.string(`pass_hash`).notNullable();
    tbl.unique([`user_name`]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user');
};
