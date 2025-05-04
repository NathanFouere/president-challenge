import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'game_definitions';

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.json('parliamentary_election_turns').notNullable().defaultTo('[]');
      table.json('senatorial_election_turns').notNullable().defaultTo('[]');
      table.json('presidential_election_turns').notNullable().defaultTo('[]');
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('parliamentary_election_turns');
      table.dropColumn('senatorial_election_turns');
      table.dropColumn('presidential_election_turns');
    });
  }
}
