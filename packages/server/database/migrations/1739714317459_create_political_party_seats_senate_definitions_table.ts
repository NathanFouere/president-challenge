import { BaseSchema } from '@adonisjs/lucid/schema';
import { PoliticalAffiliation } from '@president-challenge/shared/dist/political-party/political-affiliation.js';

export default class extends BaseSchema {
  protected tableName = 'political_party_seats_senate_definitions';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('default_number_of_seats')
        .unsigned()
        .notNullable();

      table.enum('political_party_affiliation', [
        PoliticalAffiliation.FarLeft,
        PoliticalAffiliation.Left,
        PoliticalAffiliation.CenterLeft,
        PoliticalAffiliation.CenterRight,
        PoliticalAffiliation.Right,
        PoliticalAffiliation.FarRight,
      ]).notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });

    this.schema.alterTable('political_party_seats_senates', (table) => {
      table
        .integer('definition_id')
        .unsigned()
        .references('id')
        .inTable(this.tableName)
        .onDelete('CASCADE');
    });
  }

  async down() {
    this.schema.alterTable('political_party_seats_senates', (table) => {
      table.dropForeign(['definition_id']);
    });
    this.schema.dropTable(this.tableName);
  }
}
