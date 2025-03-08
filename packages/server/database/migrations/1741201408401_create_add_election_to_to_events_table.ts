import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('events', (table) => {
      table
        .integer('election_id')
        .unsigned()
        .references('id')
        .inTable('elections')
        .onDelete('CASCADE')
        .nullable()
      ;
    });
  }

  async down() {
    this.schema.alterTable('events', (table) => {
      table.dropColumn('election_id');
    });
  }
}
