import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'licensed_files';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('identifier').primary();
      table.text('title').notNullable();
      table.text('attribution').nullable();
      table.text('source').nullable();
      table.text('license').nullable();
      table.string('date').nullable();
      table.string('path').notNullable();
      table.boolean('is_video').notNullable();

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
