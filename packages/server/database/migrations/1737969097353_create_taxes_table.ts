import { BaseSchema } from '@adonisjs/lucid/schema';
import { TaxType } from '#tax/domain/model/tax_type';
import { TaxLevel } from '#tax/domain/model/tax_level';

export default class extends BaseSchema {
  protected tableName = 'taxes';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('name').notNullable();
      table.text('description').notNullable();
      table.string('color').notNullable();
      table.enum('type', [TaxType.INCOME]).notNullable();
      table.enum('level', [
        TaxLevel.VERY_LOW,
        TaxLevel.LOW,
        TaxLevel.MEDIUM,
        TaxLevel.HIGH,
        TaxLevel.VERY_HIGH,
      ]).notNullable();
      table.integer('state_id').unsigned().references('id').inTable('states').onDelete('CASCADE');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
