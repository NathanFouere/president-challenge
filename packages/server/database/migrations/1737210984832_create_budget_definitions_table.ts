import { BaseSchema } from '@adonisjs/lucid/schema';
import { BudgetType } from '#budget/domain/model/budget_type';

export default class extends BaseSchema {
  protected tableName = 'budget_definitions';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('name').notNullable();
      table.string('description').notNullable();
      table.string('color').notNullable();
      // TODO => ajouter limite car level est issus d'une enum
      table.integer('default_level').notNullable();
      table.enum('type', [
        BudgetType.DEFENSE,
        BudgetType.HEALTH,
        BudgetType.RETIREMENT,
      ]).notNullable();
      table.string('licensed_file_identifier')
        .references('identifier')
        .inTable('licensed_files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
