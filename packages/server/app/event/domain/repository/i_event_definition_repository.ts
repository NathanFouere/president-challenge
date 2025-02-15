import type EventDefinition from '#event/domain/models/event_definition';

export default abstract class IEventDefinitionRepository {
  public abstract save(event: EventDefinition): Promise<void>;
  public abstract findById(eventId: number): Promise<EventDefinition | null>;
  public abstract findByIdentifier(identifier: string): Promise<EventDefinition>;
  public abstract saveWithLicensedFiles(event: EventDefinition, licensedFilesIdentifiers: string[]): Promise<void>;
  public abstract delete(event: EventDefinition): Promise<void>;
  public abstract getAll(): Promise<EventDefinition[]>;
}
