import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'choice_definitions';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('text').notNullable();
      table
        .integer('event_definition_id')
        .unsigned()
        .references('id')
        .inTable('event_definitions')
        .onDelete('CASCADE');

      table
        .integer('trigger_event_definition_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('event_definitions')
        .onDelete('SET NULL');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
