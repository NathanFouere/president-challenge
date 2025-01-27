import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'budgets';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('name').notNullable();
      table.string('description').notNullable();
      table.string('color').notNullable();
      table.integer('level').notNullable();
      table.integer('state_id').unsigned().references('id').inTable('states').onDelete('CASCADE');

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
