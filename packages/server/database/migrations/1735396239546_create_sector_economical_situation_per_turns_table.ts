import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'sector_economical_situation_per_turns';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.float('amount').notNullable();
      table.integer('turn').notNullable();

      table
        .string('color')
        .notNullable();

      table
        .integer('sector_id')
        .unsigned()
        .references('id')
        .inTable('sectors')
        .onDelete('CASCADE');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
