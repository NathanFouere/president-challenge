import { BaseSchema } from '@adonisjs/lucid/schema';
import { SectorTypes } from '@shared/dist/sector/sector-types.js';
import { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import { LawEffectType } from '#law/domain/model/law-effect/law_effect_type';
import { BudgetType } from '#state/domain/model/budget_type';
import { TaxType } from '#tax/domain/model/tax_type';

export default class extends BaseSchema {
  protected tableName = 'law_effects';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('identifier').primary();

      table.enum('type', [
        LawEffectType.BUDGET_LEVEL,
        LawEffectType.SECTOR_PROPERTY,
        LawEffectType.TAX_LEVEL,
      ]).notNullable();

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

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });

    this.schema.alterTable('laws', (table) => {
      table.string('law_effect_identifier').unsigned().references('identifier').inTable('law_effects').onDelete('CASCADE');
    });
  }

  async down() {
    this.schema.alterTable('laws', (table) => {
      table.dropColumn('law_effect_identifier');
    });

    this.schema.dropTable(this.tableName);
  }
}
