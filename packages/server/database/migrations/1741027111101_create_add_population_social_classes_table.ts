import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('social_class_definitions', (table) => {
      table.integer('population').notNullable().defaultTo(0);
    });
  }

  async down() {
    this.schema.table('social_class_definitions', (table) => {
      table.dropColumn('population');
    });
  }
}
