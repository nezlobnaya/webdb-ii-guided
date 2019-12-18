//the changes we want to make
exports.up = function(knex) {
  return knex.schema.createTable('fruits', tbl => {
      tbl.increments();  
      tbl.string('name', 128).unique().notNullable()
      tbl.decimal('avgWeightOz').notNullable()
      tbl.boolean('delicious')
  })
//   .createTable()
};
//undoes the changes
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('fruits')
};
