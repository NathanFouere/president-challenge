import { BaseSchema } from '@adonisjs/lucid/schema';
import { EventType } from '#event/domain/models/event_type';

export default class extends BaseSchema {
  async up() {
    this.schema.raw(`
      ALTER TABLE event_definitions
      DROP CONSTRAINT event_definitions_type_check;

      ALTER TABLE event_definitions
      ADD CONSTRAINT event_definitions_type_check
      CHECK (type IN (
        '${EventType.Choice}',
        '${EventType.SuperEvent}',
        '${EventType.Historical}',
        '${EventType.General}'
        ));
    `);
  }

  async down() {

  }
}
