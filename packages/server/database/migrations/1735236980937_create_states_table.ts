import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'states';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.text('description').notNullable();
      table.integer('economical_situation').notNullable();
      table
        .string('flag_identifier')
        .references('identifier')
        .inTable('licensed_files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable();

      table.integer('game_id')
        .unsigned()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });

    this.schema.alterTable('licensed_files', (table) => {
      table
        .integer('state_id')
        .unsigned()
        .references('id')
        .inTable(this.tableName)
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable();
    });
  }

  async down() {
    this.schema.alterTable('licensed_files', (table) => {
      table.dropForeign(['state_id']);
      table.dropColumn('state_id');
    });

    this.schema.dropTable(this.tableName);
  }
}
