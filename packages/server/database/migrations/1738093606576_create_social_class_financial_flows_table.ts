import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'social_class_financial_flows';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('social_class_id').unsigned().references('id').inTable('social_classes').onDelete('CASCADE');

      table.integer('amount');

      table.integer('turn');

      table.string('color');

      table.string('name');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
