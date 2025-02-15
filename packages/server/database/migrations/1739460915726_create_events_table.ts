import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'events';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.boolean('is_available').notNullable();
      table.boolean('been_read').notNullable();
      table.boolean('is_displayable').notNullable();
      table.integer('turn').notNullable();
      table
        .integer('game_id')
        .unsigned()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE');
      table
        .integer('definition_id')
        .unsigned()
        .references('id')
        .inTable('event_definitions')
        .onDelete('CASCADE');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
