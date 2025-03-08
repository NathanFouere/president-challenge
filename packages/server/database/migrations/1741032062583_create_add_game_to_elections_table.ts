import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('elections', (table) => {
      table.integer('game_id').unsigned().references('id').inTable('games').onDelete('CASCADE');
    });
  }

  async down() {
    this.schema.alterTable('elections', (table) => {
      table.dropColumn('game_id');
    });
  }
}
