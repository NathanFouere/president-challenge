import { BaseSchema } from '@adonisjs/lucid/schema';
import { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';

export default class extends BaseSchema {
  protected tableName = 'sectors';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('economical_situation').notNullable();

      table.enum('ownership_type', [
        SectorOwnershipType.PUBLIC,
        SectorOwnershipType.MIXED,
        SectorOwnershipType.PRIVATE,
      ]).notNullable();

      table.integer('definition_id')
        .unsigned()
        .references('id')
        .inTable('sector_definitions')
        .onDelete('CASCADE');

      table
        .integer('game_id')
        .unsigned()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
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
    this.schema.alterTable('social_classes', (table) => {
      table.dropForeign('sector_id');
      table.dropColumn('sector_id');
    });
    this.schema.dropTable(this.tableName);
  }
}
