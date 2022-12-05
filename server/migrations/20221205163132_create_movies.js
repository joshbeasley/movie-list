/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const exists = await knex.schema.hasTable('movie')
  if(!exists) {
    return knex.schema.createTableIfNotExists('movie', table => {
      table.increments();
      table.string('title', 100);
    })
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('movie');
};
