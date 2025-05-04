import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'game_definitions';

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('in_development').notNullable().defaultTo(true);
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('in_development');
    });
  }
}
