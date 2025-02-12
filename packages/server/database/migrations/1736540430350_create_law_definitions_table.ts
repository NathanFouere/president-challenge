import { BaseSchema } from '@adonisjs/lucid/schema';
import { SectorTypes } from '@shared/dist/sector/sector-types.js';
import { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import { LawType } from '#law/domain/model/law_type';
import { TaxType } from '#tax/domain/model/tax_type';
import { BudgetType } from '#state/domain/model/budget_type';

export default class extends BaseSchema {
  protected tableName = 'law_definitions';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.enum('type', [
        LawType.BUDGET_LEVEL,
        LawType.TAX_LEVEL,
        LawType.SECTOR_PROPERTY,
      ]).notNullable();
      table.boolean('voted_by_default').notNullable();
      table.integer('order').notNullable();
      table.integer('political_weight_required').notNullable();
      table.string('name').notNullable();
      table.text('description').notNullable();

      table.enum('budget_type_to_change', [
        BudgetType.RETIREMENT,
        BudgetType.HEALTH,
        BudgetType.DEFENSE,
      ]).nullable();

      table.integer('budget_level_to_change').nullable();

      table.enum('sector_type_to_change', [
        SectorTypes.Mine,
        SectorTypes.Agricultural,
        SectorTypes.Industrial,
        SectorTypes.Service,
      ]).nullable();

      table.enum('sector_ownership_type_to_change', [
        SectorOwnershipType.PUBLIC,
        SectorOwnershipType.MIXED,
        SectorOwnershipType.PRIVATE,
      ]).nullable();

      table.enum('tax_type_to_change', [
        TaxType.WEALTH,
      ]).nullable();

      table.integer('tax_level_to_change').nullable();

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
