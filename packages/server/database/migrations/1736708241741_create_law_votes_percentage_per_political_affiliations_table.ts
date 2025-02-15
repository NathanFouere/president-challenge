import { BaseSchema } from '@adonisjs/lucid/schema';
import { PoliticalAffiliation } from '@shared/dist/political-party/political-affiliation.js';

export default class extends BaseSchema {
  protected tableName = 'law_votes_percentage_per_political_affiliations';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('law_definition_id')
        .unsigned()
        .references('id')
        .inTable('law_definitions')
        .onDelete('CASCADE');

      table.enum('political_affiliation', [
        PoliticalAffiliation.FarLeft,
        PoliticalAffiliation.Left,
        PoliticalAffiliation.CenterLeft,
        PoliticalAffiliation.CenterRight,
        PoliticalAffiliation.Right,
        PoliticalAffiliation.FarRight,
      ]).notNullable();

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
