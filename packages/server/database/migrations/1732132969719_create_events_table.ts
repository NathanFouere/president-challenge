import { BaseSchema } from '@adonisjs/lucid/schema';

export default class Events extends BaseSchema {
  protected tableName = 'events';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('title').notNullable();
      table.text('text').notNullable();
      table.integer('turn').notNullable();

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
