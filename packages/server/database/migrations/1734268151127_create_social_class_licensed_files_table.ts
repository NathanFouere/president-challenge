import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'social_class_licensed_files';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('social_class_id').references('id').inTable('social_classes').onDelete('cascade').notNullable();
      table.string('licensed_file_identifier').references('identifier').inTable('licensed_files').notNullable();

      table.primary(['social_class_id', 'licensed_file_identifier']);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
