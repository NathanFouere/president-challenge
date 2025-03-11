import { BaseSchema } from '@adonisjs/lucid/schema';
import { GameDefeatSource } from '@president-challenge/shared/dist/game/game-defeat-source.js';

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('games', (table) => {
      table.enum('defeat_source', [
        GameDefeatSource.LOSE_PRESIDENTIAL_ELECTION,
        GameDefeatSource.POPULAR_UPRISING,
        GameDefeatSource.REVOLUTION,
      ]).nullable();
    });
  }

  async down() {
    this.schema.alterTable('games', (table) => {
      table.dropColumn('defeat_source');
    });
  }
}
