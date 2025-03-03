import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('games', (table) => {
      table.integer('max_turns').unsigned().notNullable();
    });
  }

  async down() {
    this.schema.alterTable('games', (table) => {
      table.dropColumn('max_turns');
    });
  }
}
