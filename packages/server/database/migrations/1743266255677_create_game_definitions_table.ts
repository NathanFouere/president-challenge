import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'game_definitions';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('identifier').primary();

      table.integer('max_turns').notNullable();

      table.string('name').notNullable();

      table.text('description').notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');

      table
        .string('logo_identifier')
        .references('identifier')
        .inTable('licensed_files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .notNullable();
    });

    this.schema.alterTable('games', (table) => {
      table.string('definition_identifier').unsigned().references('identifier').inTable('game_definitions').onDelete('CASCADE');
      table.dropColumn('max_turns');
    });

    this.schema.alterTable('political_party_definitions', (table) => {
      table.string('game_definition_identifier').unsigned().references('identifier').inTable('game_definitions').onDelete('CASCADE');
    });

    this.schema.alterTable('senate_definitions', (table) => {
      table.string('game_definition_identifier').unsigned().references('identifier').inTable('game_definitions').onDelete('CASCADE');
    });

    this.schema.alterTable('state_definitions', (table) => {
      table.string('game_definition_identifier').unsigned().references('identifier').inTable('game_definitions').onDelete('CASCADE');
    });
  }

  async down() {
    this.schema.alterTable('games', (table) => {
      table.dropColumn('definition_identifier');
      table.integer('max_turns').notNullable().defaultTo(0);
    });

    this.schema.alterTable('political_party_definitions', (table) => {
      table.dropColumn('game_definition_identifier');
    });

    this.schema.alterTable('senate_definitions', (table) => {
      table.dropColumn('game_definition_identifier');
    });

    this.schema.alterTable('state_definitions', (table) => {
      table.dropColumn('game_definition_identifier');
    });
    this.schema.dropTable(this.tableName);
  }
}
