import { BaseSchema } from '@adonisjs/lucid/schema';

export default class EventLicensedFiles extends BaseSchema {
  protected tableName = 'event_definition_licensed_file';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('event_definition_id').references('id').inTable('event_definitions').onDelete('cascade').notNullable();
      table.string('licensed_file_identifier').references('identifier').inTable('licensed_files').notNullable();

      table.primary(['event_definition_id', 'licensed_file_identifier']);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
