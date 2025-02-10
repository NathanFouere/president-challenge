import { BaseSchema } from '@adonisjs/lucid/schema';
import { HappinessModifierType } from '@shared/dist/common/happiness-modifier-type.js';

export default class extends BaseSchema {
  protected tableName = 'social_class_happiness_modifiers';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('name').notNullable();
      table.text('description').notNullable();
      table.string('color').notNullable();
      table.enum('type', [
        HappinessModifierType.TEMPORARY,
        HappinessModifierType.PERMANENT,
      ]).notNullable();
      table.integer('duration').nullable();
      table.float('amount').notNullable();

      table
        .integer('social_class_id')
        .unsigned()
        .references('id')
        .inTable('social_classes')
        .onDelete('CASCADE');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
