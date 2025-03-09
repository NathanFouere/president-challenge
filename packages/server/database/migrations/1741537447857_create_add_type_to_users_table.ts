import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('users', (table) => {
      table.enum('type', [
        'player',
        'admin',
      ]).defaultTo('player');
    });
  }

  async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('type');
    });
  }
}
