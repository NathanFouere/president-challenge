import { BaseSchema } from '@adonisjs/lucid/schema';
import { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';

export default class extends BaseSchema {
  protected tableName = 'sector_property_law_effects';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('game_id')
        .unsigned()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE');
      table.integer('law_id').references('id').inTable('laws').notNullable();
      table.integer('sector_id').references('id').inTable('sectors').notNullable();

      table.enum('ownership_type', [
        SectorOwnershipType.PUBLIC,
        SectorOwnershipType.MIXED,
        SectorOwnershipType.PRIVATE,
      ]).notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
