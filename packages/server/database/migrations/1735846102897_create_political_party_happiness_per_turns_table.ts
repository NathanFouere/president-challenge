import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'political_party_happiness_per_turns';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('amount').notNullable();
      table.integer('turn').notNullable();

      table
        .string('color')
        .notNullable();

      table
        .integer('political_party_id')
        .unsigned()
        .references('id')
        .inTable('political_parties')
        .onDelete('CASCADE');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
