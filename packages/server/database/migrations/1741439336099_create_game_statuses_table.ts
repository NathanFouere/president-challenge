import { BaseSchema } from '@adonisjs/lucid/schema';
import { GameStatus } from '@shared/dist/game/game_status.js';

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('games', (table) => {
      table.enum('status', [
        GameStatus.Active,
        GameStatus.Defeated,
        GameStatus.Finished,
      ]).defaultTo(GameStatus.Active);
    });
  }

  async down() {
    this.schema.alterTable('games', (table) => {
      table.dropColumn('status');
    });
  }
}
