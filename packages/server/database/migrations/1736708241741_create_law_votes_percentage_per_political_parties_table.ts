import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'law_votes_percentage_per_political_parties';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('law_id')
        .unsigned()
        .references('id')
        .inTable('laws')
        .onDelete('CASCADE');

      table
        .integer('political_party_id')
        .unsigned()
        .references('id')
        .inTable('political_parties')
        .onDelete('CASCADE');

      table
        .float('percentage')
        .notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
