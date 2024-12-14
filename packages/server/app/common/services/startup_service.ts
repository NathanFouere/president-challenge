import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PoliticalPartyStartupService } from '#political-party/infrastructure/startup/political_party_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { EventStartupService } from '#event/infrastructure/startup/event_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ParliamentStartupService } from '#legislature/infrastructure/startup/parliament_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SenateStartupService } from '#legislature/infrastructure/startup/senate_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PoliticalPartySeatsStartupService } from '#legislature/infrastructure/startup/political_party_seats_startup_service';

@inject()
export class StartupService {
  constructor(
    private readonly politicalPartyStartupService: PoliticalPartyStartupService,
    private readonly eventStartupService: EventStartupService,
    private readonly parliamentStartupService: ParliamentStartupService,
    private readonly senateStartupService: SenateStartupService,
    private readonly politicalPartySeatsStartupService: PoliticalPartySeatsStartupService,
  ) {
  }

  public async initialize(gameId: number): Promise<void> {
    try {
      await this.eventStartupService.initialize(gameId);
      const parliament = await this.parliamentStartupService.initialize(gameId);
      const senate = await this.senateStartupService.initialize(gameId);
      const politicalParties = await this.politicalPartyStartupService.initialize(gameId);
      await this.politicalPartySeatsStartupService.initialize(politicalParties, senate.id, parliament.id);
    }
    catch (error) {
      console.error(error);
      throw new Error('Failed to initialize game');
    }
  }
}
