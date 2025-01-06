import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'product_price_per_turns';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.float('amount').notNullable();
      table.integer('turn').notNullable();

      table
        .string('color')
        .notNullable();

      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
