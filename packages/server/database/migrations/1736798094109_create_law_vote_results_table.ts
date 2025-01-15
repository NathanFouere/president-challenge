import { BaseSchema } from '@adonisjs/lucid/schema';
import { LegislatureType } from '#legislature/domain/models/legislature_type';

export default class extends BaseSchema {
  protected tableName = 'law_vote_results';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('law_id').unsigned().references('id').inTable('laws').onDelete('CASCADE');
      table.integer('turn').notNullable();
      table.enum('legislature_type', [LegislatureType.PARLIAMENT, LegislatureType.SENATE]).notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
