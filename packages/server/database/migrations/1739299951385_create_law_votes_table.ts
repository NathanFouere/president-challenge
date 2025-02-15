import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'law_votes';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('turn').notNullable();
      table.boolean('vote_passed').defaultTo(false).notNullable();

      table.integer('law_id').unsigned().references('id').inTable('laws').onDelete('CASCADE');
      table.unique(['turn', 'law_id'], 'unique_turn_law_id');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
