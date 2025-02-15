import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'taxes';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('game_id')
        .unsigned()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE').notNullable();
      // TODO => ajouter limite car level est issus d'une enum
      table.integer('level').notNullable();
      table.float('rate').notNullable();
      table.integer('state_id').unsigned().references('id').inTable('states').onDelete('CASCADE');

      table
        .integer('definition_id')
        .unsigned()
        .references('id')
        .inTable('tax_definitions')
        .onDelete('CASCADE');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
