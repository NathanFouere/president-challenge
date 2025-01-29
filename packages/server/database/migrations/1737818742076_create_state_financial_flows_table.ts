import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'state_financial_flows';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('state_id').unsigned().references('id').inTable('states').onDelete('CASCADE');

      table.integer('amount');

      table.string('color');

      table.string('name');

      table.integer('turn');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
