import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'sectors';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.text('description').notNullable();
      table.integer('economical_situation').notNullable();
      table.enum('type',
        [
          'Agricultural',
          'Industrial',
          'Service',
          'Mine',
        ])
        .notNullable();

      table
        .integer('game_id')
        .unsigned()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE');

      table
        .string('licensed_file_identifier')
        .references('identifier')
        .inTable('licensed_files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable();

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });

    this.schema.alterTable('products', (table) => {
      table
        .integer('sector_id')
        .unsigned()
        .references('id')
        .inTable(this.tableName)
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable();
    });

    this.schema.alterTable('social_classes', (table) => {
      table
        .integer('sector_id')
        .unsigned()
        .references('id')
        .inTable(this.tableName)
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable();
    });
  }

  async down() {
    this.schema.alterTable('products', (table) => {
      table.dropForeign('sector_id');
      table.dropColumn('sector_id');
    });
    this.schema.alterTable('social_classes', (table) => {
      table.dropForeign('sector_id');
      table.dropColumn('sector_id');
    });
    this.schema.dropTable(this.tableName);
  }
}
