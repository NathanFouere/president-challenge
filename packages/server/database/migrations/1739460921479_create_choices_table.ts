import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'choices';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
        .integer('game_id')
        .unsigned()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('definition_id')
        .unsigned()
        .references('id')
        .inTable('choice_definitions')
        .onDelete('CASCADE')
        .notNullable();
      table
        .enum('status', [
          'available',
          'chosen',
          'unavailable',
        ])
        .defaultTo('available')
        .notNullable()
      ;

      table
        .integer('event_id')
        .unsigned()
        .references('id')
        .inTable('events')
        .onDelete('CASCADE');

      table
        .integer('trigger_event_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('events')
        .onDelete('SET NULL');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
