import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('political_party_seats_senate_definitions', (table) => {
      table.string('game_definition_identifier').unsigned().references('identifier').inTable('game_definitions').onDelete('CASCADE');
    });
    this.schema.alterTable('political_party_seats_parliament_definitions', (table) => {
      table.string('game_definition_identifier').unsigned().references('identifier').inTable('game_definitions').onDelete('CASCADE');
    });
  }

  async down() {
    this.schema.alterTable('political_party_seats_senate_definitions', (table) => {
      table.dropColumn('game_definition_identifier');
    });
    this.schema.alterTable('political_party_seats_parliament_definitions', (table) => {
      table.dropColumn('game_definition_identifier');
    });
  }
}
