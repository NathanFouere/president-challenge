import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('political_party_definitions', (table) => {
      table.boolean('in_power_by_default').notNullable().defaultTo(false);
    });

    this.schema.alterTable('political_parties', (table) => {
      table.boolean('in_power').notNullable().defaultTo(false);
    });
  }

  async down() {
    this.schema.table('political_party_definitions', (table) => {
      table.dropColumn('in_power_by_default');
    });

    this.schema.table('political_parties', (table) => {
      table.dropColumn('in_power');
    });
  }
}
