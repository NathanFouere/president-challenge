import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('event_definitions', (table) => {
      table.string('turn').nullable().alter();
    });

    this.schema.alterTable('events', (table) => {
      table.string('turn').nullable().alter();
    });
  }

  async down() {
    this.schema.alterTable('event_definitions', (table) => {
      table.string('turn').notNullable().alter();
    });

    this.schema.alterTable('events', (table) => {
      table.string('turn').notNullable().alter();
    });
  }
}
