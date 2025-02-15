import { BaseSchema } from '@adonisjs/lucid/schema';
import { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';

export default class extends BaseSchema {
  protected tableName = 'sector_definitions';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.text('description').notNullable();
      table.integer('default_economical_situation').notNullable();
      table.enum('type',
        [
          'Agricultural',
          'Industrial',
          'Service',
          'Mine',
        ])
        .notNullable();

      table.enum('default_ownership_type', [
        SectorOwnershipType.PUBLIC,
        SectorOwnershipType.MIXED,
        SectorOwnershipType.PRIVATE,
      ]).notNullable();

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

    this.schema.alterTable('social_class_definitions', (table) => {
      table
        .integer('sector_definition_id')
        .unsigned()
        .references('id')
        .inTable(this.tableName)
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable();
    });
  }

  async down() {
    this.schema.alterTable('social_class_definitions', (table) => {
      table.dropForeign('sector_definition_id');
      table.dropColumn('sector_definition_id');
    });
    this.schema.dropTable(this.tableName);
  }
}
