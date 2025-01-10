import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'property_laws';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('game_id')
        .unsigned()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE');

      table.boolean('voted').notNullable();
      table.integer('order').notNullable();
      table.string('name').notNullable();
      table.text('description').notNullable();

      table.enum('sector_type', [
        'Agricultural',
        'Industrial',
        'Service',
        'Mine',
      ]).notNullable();

      table.enum('sector_ownership_type_to', [
        'PRIVATE',
        'MIXED',
        'PUBLIC',
      ]).notNullable();

      table.integer('law_group_id')
        .unsigned()
        .references('id')
        .inTable('law_groups')
        .onDelete('CASCADE');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
