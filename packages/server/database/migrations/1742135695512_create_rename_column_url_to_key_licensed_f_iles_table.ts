import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('licensed_files', (table) => {
      table.renameColumn('path', 'key');
    });
  }

  async down() {
    this.schema.alterTable('licensed_files', (table) => {
      table.renameColumn('key', 'path');
    });
  }
}
