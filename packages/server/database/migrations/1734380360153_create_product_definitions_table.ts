import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'product_definitions';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.text('description').notNullable();
      table.double('default_price', 10, 2).notNullable();
      table.double('default_cost_of_production', 10, 2).notNullable();
      table
        .string('licensed_file_identifier')
        .references('identifier')
        .inTable('licensed_files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable();

      table
        .integer('sector_definition_id')
        .unsigned()
        .references('id')
        .inTable('sector_definitions')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable();

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
