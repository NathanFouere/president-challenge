import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'budgets';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('level').notNullable();
      table.integer('state_id').unsigned().references('id').inTable('states').onDelete('CASCADE');
      table.integer('game_id').unsigned().references('id').inTable('games').onDelete('CASCADE');

      table
        .integer('definition_id')
        .unsigned()
        .references('id')
        .inTable('budget_definitions')
        .onDelete('CASCADE');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
