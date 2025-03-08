import { BaseSchema } from '@adonisjs/lucid/schema';
import { ElectionType } from '#election/domain/model/election_type';

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('elections', (table) => {
      table.dropColumn('election_type');
      table.enum('type', [
        ElectionType.PRESIDENTIAL,
        ElectionType.PARLIAMENTARY,
        ElectionType.SENATORIAL,
      ]).notNullable();
    });
  }

  async down() {
  }
}
