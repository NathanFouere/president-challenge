import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'votes_for_political_party_in_elections';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('votes').notNullable();
      table
        .integer('political_party_id')
        .references('id')
        .inTable('political_parties')
        .unsigned()
        .notNullable()
        .onDelete('CASCADE')
      ;
      table
        .integer('election_id')
        .references('id')
        .inTable('elections')
        .unsigned()
        .notNullable()
        .onDelete('CASCADE')
      ;

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
