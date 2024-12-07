import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PoliticalPartyStartupService } from '#political-party/infrastructure/startup/political_party_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { EventStartupService } from '#event/infrastructure/startup/event_startup_service';

@inject()
export class StartupService {
  constructor(
    private readonly politicalPartyStartupService: PoliticalPartyStartupService,
    private readonly eventStartupService: EventStartupService,
  ) {
  }

  public async initialize(gameId: number): Promise<void> {
    try {
      await this.politicalPartyStartupService.initialize(gameId);
      await this.eventStartupService.initialize(gameId);
    }
    catch (error) {
      console.error(error);
      throw new Error('Failed to initialize game');
    }
  }
}
