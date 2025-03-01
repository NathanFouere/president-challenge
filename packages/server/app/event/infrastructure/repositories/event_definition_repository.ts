import type IEventDefinitionRepository from '#event/domain/repository/i_event_definition_repository';
import EventDefinition from '#event/domain/models/event_definition';

export default class EventDefinitionRepository implements IEventDefinitionRepository {
  public async save(event: EventDefinition): Promise<void> {
    await event.save();
  }

  public async findById(eventId: number): Promise<EventDefinition | null> {
    return await EventDefinition.find(eventId);
  }

  public async delete(event: EventDefinition): Promise<void> {
    await event.delete();
  }

  public async getAll(): Promise<EventDefinition[]> {
    return await EventDefinition.all();
  }
}
