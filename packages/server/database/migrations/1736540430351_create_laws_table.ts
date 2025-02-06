import { BaseSchema } from '@adonisjs/lucid/schema';
import { LawType } from '#law/domain/model/law_type';

export default class extends BaseSchema {
  protected tableName = 'laws';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('game_id')
        .unsigned()
        .references('id')
        .inTable('games')
        .onDelete('CASCADE');

      table.enum('type', [
        LawType.BUDGET_LEVEL,
        LawType.TAX_LEVEL,
        LawType.SECTOR_PROPERTY,
      ]).notNullable();
      table.boolean('voted').notNullable();
      table.integer('order').notNullable();
      table.integer('political_weight_required').notNullable();
      table.string('name').notNullable();
      table.text('description').notNullable();

      table.integer('law_group_id')
        .unsigned()
        .references('id')
        .inTable('law_groups')
        .onDelete('CASCADE');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
