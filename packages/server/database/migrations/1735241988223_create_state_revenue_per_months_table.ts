import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'state_economical_situation_per_turns';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('amount').notNullable();
      table.integer('turn').notNullable();

      table
        .integer('state_id')
        .unsigned()
        .references('id')
        .inTable('states')
        .onDelete('CASCADE');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
