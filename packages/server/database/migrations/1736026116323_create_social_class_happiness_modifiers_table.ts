import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'social_class_happiness_modifiers';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('name').notNullable();
      table.text('description').notNullable();
      table.string('color').notNullable();
      table.enum('type', ['permanent', 'temporary']).notNullable();
      table.integer('duration').nullable();

      table
        .integer('social_class_id')
        .unsigned()
        .references('id')
        .inTable('social_classes')
        .onDelete('CASCADE');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
