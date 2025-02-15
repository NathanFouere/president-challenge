import { BaseSchema } from '@adonisjs/lucid/schema';
import { TaxType } from '#tax/domain/model/tax_type';

export default class extends BaseSchema {
  protected tableName = 'tax_definitions';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.text('description').notNullable();
      table.enum('type', [TaxType.WEALTH]).notNullable();

      // TODO => ajouter limite car level est issus d'une enum
      table.integer('default_level').notNullable();
      table.float('default_rate').notNullable();
      table.string('color').notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
