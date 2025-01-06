import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'political_party_happiness_modifiers';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('name').notNullable();
      table.text('description').notNullable();
      table.string('color').notNullable();
      table.enum('type', ['Permanent', 'Temporary']).notNullable();
      table.integer('duration').nullable();
      table.float('amount').notNullable();

      table
        .integer('political_party_id')
        .unsigned()
        .references('id')
        .inTable('political_parties')
        .onDelete('CASCADE');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
