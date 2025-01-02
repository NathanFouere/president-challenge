import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'social_classes';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.text('description').notNullable();
      table.string('color').notNullable();
      table.integer('economical_situation').notNullable();
      table.integer('happiness_level').notNullable();
      table.enum('type',
        [
          'Capitalist',
          'Petit Bourgeois',
          'Proletariat',
        ])
        .notNullable();
      table.string('sub_type').notNullable();
      table.integer('game_id')
        .unsigned()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
