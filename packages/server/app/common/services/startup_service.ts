import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PoliticalPartyStartupService } from '#game/infrastructure/startup/political_party_startup_service';

@inject()
export class StartupService {
  constructor(
    private readonly politicalPartyStartupService: PoliticalPartyStartupService,
  ) {
  }

  public async initialize(gameId: number): Promise<void> {
    await this.politicalPartyStartupService.initialize(gameId);
  }
}
