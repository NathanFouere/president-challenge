import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'social_classes';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('economical_situation').notNullable();
      table.integer('game_id')
        .unsigned()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE');

      table.integer('definition_id')
        .unsigned()
        .references('id')
        .inTable('social_class_definitions')
        .onDelete('CASCADE');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
