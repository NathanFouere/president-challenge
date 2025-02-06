import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'budget_level_law_effects';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('game_id')
        .unsigned()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE');
      table.integer('law_id').references('id').inTable('laws').notNullable();

      table.integer('budget_id').references('id').inTable('budgets').notNullable();
      // TODO => ajouter limite car level est issus d'une enum
      table.integer('level').notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
