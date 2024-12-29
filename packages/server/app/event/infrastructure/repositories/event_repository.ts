import Event from '#event/domain/models/event';
import type IEventRepository from '#event/domain/repository/i_event_repository';

export default class EventRepository implements IEventRepository {
  public async save(event: Event): Promise<void> {
    await event.save();
  }

  public async findById(eventId: number): Promise<Event | null> {
    return Event.find(eventId);
  }

  public async saveWithLicensedFiles(event: Event, licensedFilesIdentifiers: string[]): Promise<void> {
    await event.save();
    event.related('licensedFiles').attach(licensedFilesIdentifiers);
  }

  public async delete(event: Event): Promise<void> {
    await event.delete();
  }
}
