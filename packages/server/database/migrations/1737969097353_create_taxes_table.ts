import { BaseSchema } from '@adonisjs/lucid/schema';
import { TaxType } from '#tax/domain/model/tax_type';

export default class extends BaseSchema {
  protected tableName = 'taxes';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('game_id')
        .unsigned()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE').notNullable();
      table.string('name').notNullable();
      table.text('description').notNullable();
      table.enum('type', [TaxType.WEALTH]).notNullable();
      // TODO => ajouter limite car level est issus d'une enum
      table.integer('level').notNullable();
      table.string('color').notNullable();
      table.float('base_rate').notNullable();
      table.integer('state_id').unsigned().references('id').inTable('states').onDelete('CASCADE');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
