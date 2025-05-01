import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('law_definitions', (table) => {
      table.string('game_definition_identifier').unsigned().references('identifier').inTable('game_definitions').onDelete('CASCADE');
    });

    this.schema.alterTable('event_definitions', (table) => {
      table.string('game_definition_identifier').unsigned().references('identifier').inTable('game_definitions').onDelete('CASCADE');
    });

    this.schema.alterTable('product_definitions', (table) => {
      table.string('game_definition_identifier').unsigned().references('identifier').inTable('game_definitions').onDelete('CASCADE');
    });
  }

  async down() {
    this.schema.alterTable('law_definitions', (table) => {
      table.dropColumn('game_definition_identifier');
    });

    this.schema.alterTable('event_definitions', (table) => {
      table.dropColumn('game_definition_identifier');
    });

    this.schema.alterTable('product_definitions', (table) => {
      table.dropColumn('game_definition_identifier');
    });
  }
}
