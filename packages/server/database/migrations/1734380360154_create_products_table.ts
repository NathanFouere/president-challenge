import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'products';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.double('price', 10, 2).notNullable();
      table.double('cost_of_production', 10, 2).notNullable();

      table.integer('definition_id')
        .unsigned()
        .references('id')
        .inTable('product_definitions')
        .onDelete('CASCADE');

      table
        .integer('sector_id')
        .unsigned()
        .references('id')
        .inTable('sectors')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable();

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
      table
        .integer('game_id')
        .unsigned()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
