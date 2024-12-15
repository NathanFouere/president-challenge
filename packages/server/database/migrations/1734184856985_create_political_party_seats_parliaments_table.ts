import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'political_party_seats_parliaments';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('number_of_seats').notNullable();
      table
        .integer('political_party_id')
        .unsigned()
        .references('id')
        .inTable('political_parties')
        .onDelete('CASCADE');

      table
        .integer('parliament_id')
        .unsigned()
        .references('id')
        .inTable('parliaments')
        .onDelete('CASCADE');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
