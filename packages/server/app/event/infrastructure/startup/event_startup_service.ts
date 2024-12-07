import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { EventRepository } from '#event/infrastructure/repositories/event_repository';
import summer_olumpics from '#game-config/event/historical-events/1972-summer-olympics.json' assert { type: 'json' };
import { anEvent } from '#event/application/builders/event_builder';

@inject()
export class EventStartupService {
  constructor(
    private readonly eventRepository: EventRepository,
  ) {}

  private readonly eventsConfigValues = [
    summer_olumpics,
  ];

  public async initialize(gameId: number): Promise<void> {
    await this.initializeEvents(gameId);
  }

  public async initializeEvents(gameId: number): Promise<void> {
    for (const eventConfigValue of this.eventsConfigValues) {
      const event = await anEvent()
        .withIdentifier(eventConfigValue.identifier)
        .withGameId(gameId)
        .withText(eventConfigValue.text)
        .withTitle(eventConfigValue.title)
        .withTurn(eventConfigValue.turn)
        .withIsAvailable(eventConfigValue.isAvailable)
        .exists();

      await this.eventRepository.saveWithLicensedFiles(event, eventConfigValue.licensedFilesIdentifiers);
    }
  }
}
