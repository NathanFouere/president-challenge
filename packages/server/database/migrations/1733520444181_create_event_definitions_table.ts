import { BaseSchema } from '@adonisjs/lucid/schema';
import { EventType } from '#event/domain/models/event_type';

export default class extends BaseSchema {
  protected tableName = 'event_definitions';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('identifier');
      table.string('title').notNullable();
      table.text('text').notNullable();
      table.integer('turn').notNullable();
      table.boolean('is_available_by_default').notNullable();
      table.boolean('is_displayable_by_default').notNullable();
      table.enum('type', [
        EventType.Choice,
        EventType.SuperEvent,
        EventType.Historical,
      ]).notNullable();

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
