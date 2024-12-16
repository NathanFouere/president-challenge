import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'social_classes';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.text('description').notNullable();
      table.string('color').notNullable();
      table.enum('wealth_level',
        [
          'Very low',
          'Low',
          'Medium',
          'High',
          'Very High',
        ])
        .notNullable();
      table.enum('happiness_level',
        [
          'Very Unhappy',
          'Unhappy',
          'Indifferent',
          'Happy',
          'Very Happy',
        ])
        .notNullable();
      table.enum('type',
        [
          'Bourgeoisie',
          'Proletariat',
          'Middle Class',
          'Peasantry',
          'Military',
        ])
        .notNullable();
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
