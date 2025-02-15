import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'political_party_definitions';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.text('description').notNullable();
      table.string('color').notNullable();
      table.enum('affiliation', [
        'Far Left',
        'Left',
        'Center Left',
        'Center Right',
        'Right',
        'Far Right',
      ]).notNullable();

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
