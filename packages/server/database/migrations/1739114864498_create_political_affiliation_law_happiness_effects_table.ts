import { BaseSchema } from '@adonisjs/lucid/schema';
import { PoliticalAffiliation } from '@shared/dist/political-party/political-affiliation.js';
import { HappinessModifierType } from '@shared/dist/common/happiness-modifier-type.js';

export default class extends BaseSchema {
  protected tableName = 'political_affiliation_law_happiness_effects';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.enum('political_affiliation', [
        PoliticalAffiliation.FarLeft,
        PoliticalAffiliation.Left,
        PoliticalAffiliation.CenterLeft,
        PoliticalAffiliation.CenterRight,
        PoliticalAffiliation.Right,
        PoliticalAffiliation.FarRight,
      ]).notNullable();

      table.enum('type', [
        HappinessModifierType.TEMPORARY,
        HappinessModifierType.PERMANENT,
      ]).notNullable();

      table.integer('duration').nullable();

      table.integer('happiness_modifier').notNullable();

      table.integer('law_definition_id').references('id').inTable('law_definitions').notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
