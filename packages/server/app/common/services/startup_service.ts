import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PoliticalPartyStartupService } from '#political-party/infrastructure/startup/political_party_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { EventStartupService } from '#event/infrastructure/startup/event_startup_service';
import type { StartupInterface } from '#common/interfaces/startup_interface';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ParliamentStartupService } from '#legislature/infrastructure/startup/parliament_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SenateStartupService } from '#legislature/infrastructure/startup/senate_startup_service';

@inject()
export class StartupService implements StartupInterface {
  constructor(
    private readonly politicalPartyStartupService: PoliticalPartyStartupService,
    private readonly eventStartupService: EventStartupService,
    private readonly parliamentStartupService: ParliamentStartupService,
    private readonly senateStartupService: SenateStartupService,
  ) {
  }

  public async initialize(gameId: number): Promise<void> {
    try {
      await this.politicalPartyStartupService.initialize(gameId);
      await this.eventStartupService.initialize(gameId);
      await this.parliamentStartupService.initialize(gameId);
      await this.senateStartupService.initialize(gameId);
    }
    catch (error) {
      console.error(error);
      throw new Error('Failed to initialize game');
    }
  }
}
