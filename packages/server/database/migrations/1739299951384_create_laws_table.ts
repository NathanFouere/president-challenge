import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'laws';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('game_id').references('id').inTable('games').notNullable().onDelete('CASCADE');
      table.integer('definition_id').references('id').inTable('law_definitions').notNullable().onDelete('CASCADE');
      table.boolean('voted').notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });

    this.schema.alterTable('political_party_happiness_modifiers', (table) => {
      table.integer('law_origin_id').references('id').inTable('laws').nullable();
    });

    this.schema.alterTable('social_class_happiness_modifiers', (table) => {
      table.integer('law_origin_id').references('id').inTable('laws').nullable();
    });
  }

  async down() {
    this.schema.alterTable('political_party_happiness_modifiers', (table) => {
      table.dropColumn('law_origin_id');
    });

    this.schema.alterTable('social_class_happiness_modifiers', (table) => {
      table.dropColumn('law_origin_id');
    });
    this.schema.dropTable(this.tableName);
  }
}
