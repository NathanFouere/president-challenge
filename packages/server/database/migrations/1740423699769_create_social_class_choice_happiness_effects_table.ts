import { BaseSchema } from '@adonisjs/lucid/schema';
import { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
import { HappinessModifierType } from '@shared/dist/common/happiness-modifier-type.js';

export default class extends BaseSchema {
  protected tableName = 'social_class_choice_happiness_effects';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.enum('social_class_type', [
        SocialClassTypes.CAPITALIST,
        SocialClassTypes.PETIT_BOURGEOIS,
        SocialClassTypes.PROLETARIAT,
      ]).notNullable();

      table.enum('type', [
        HappinessModifierType.TEMPORARY,
        HappinessModifierType.PERMANENT,
      ]).notNullable();
      table.integer('duration').nullable();

      table.integer('happiness_modifier').notNullable();

      table.integer('choice_definition_id').references('id').inTable('choice_definitions').notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
