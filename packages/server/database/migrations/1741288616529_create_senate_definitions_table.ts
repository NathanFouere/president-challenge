import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'senate_definitions';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('number_of_seats').notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });

    this.schema.alterTable('senates', (table) => {
      table.integer('definition_id').unsigned().references('id').inTable('senate_definitions').onDelete('CASCADE');
    });
  }

  async down() {
    this.schema.alterTable('senates', (table) => {
      table.dropForeign(['definition_id']);
      table.dropColumn('definition_id');
    });
    this.schema.dropTable(this.tableName);
  }
}
