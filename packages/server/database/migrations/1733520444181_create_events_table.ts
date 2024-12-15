import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'events';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('identifier');
      table.string('title').notNullable();
      table.text('text').notNullable();
      table.integer('turn').notNullable();
      table.boolean('is_available').notNullable();
      table.boolean('been_read').notNullable();
      table.boolean('is_displayable').notNullable();
      table.enum('type', [
        'historical',
        'choice',
        'super-event',
      ]).notNullable();
      table
        .integer('game_id')
        .unsigned()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
