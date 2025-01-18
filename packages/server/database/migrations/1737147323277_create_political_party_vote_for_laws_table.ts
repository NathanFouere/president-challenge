import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'political_party_vote_for_laws';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('political_party_id').unsigned().references('id').inTable('political_parties').onDelete('CASCADE');
      table.integer('law_vote_results_id').unsigned().references('id').inTable('law_vote_results').onDelete('CASCADE');

      table.integer('votes_for').notNullable();
      table.integer('votes_against').notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
