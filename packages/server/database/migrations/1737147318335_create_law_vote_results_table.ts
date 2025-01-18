import { BaseSchema } from '@adonisjs/lucid/schema';
import { LegislatureType } from '#legislature/domain/models/legislature_type';

export default class extends BaseSchema {
  protected tableName = 'law_vote_results';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.boolean('vote_passed').defaultTo(false).notNullable();
      table.integer('law_vote_id').unsigned().references('id').inTable('law_votes').onDelete('CASCADE');
      table.enum('legislature_type', [LegislatureType.PARLIAMENT, LegislatureType.SENATE]).notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
