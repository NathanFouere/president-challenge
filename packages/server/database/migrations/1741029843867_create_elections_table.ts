import { BaseSchema } from '@adonisjs/lucid/schema';
import { ElectionType } from '#election/domain/model/election_type';

export default class extends BaseSchema {
  protected tableName = 'elections';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('turn').notNullable();
      table.enum('election_type', [
        ElectionType.PARLIAMENTARY,
        ElectionType.PRESIDENTIAL,
      ]).notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
