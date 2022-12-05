/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movie').del()
  await knex('movie').insert([
    {id: 1, title: 'Mean Girls'},
    {id: 2, title: 'Hackers'},
    {id: 3, title: 'The Grey'},
    {id: 4, title: 'Sunshine'},
    {id: 5, title: 'Ex Machina'},
    {id: 6, title: 'The Shining'},
    {id: 7, title: 'Top Gun'},
    {id: 8, title: 'Iron Man'},
    {id: 9, title: 'The Godfather'},
    {id: 10, title: 'Star Wars: Episode IV'},
    {id: 11, title: 'The Departed'},
    {id: 12, title: 'The Exorcist'}
  ]);
};
