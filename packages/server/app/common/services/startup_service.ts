import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ProductStartupService } from '#product/infrastructure/startup/product_startup_service';
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
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SocialClassStartupService } from '#social-class/infrastructure/startup/social_class_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SectorStartupService } from '#sector/infrastructure/startup/sector_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { StateStartupService } from '#state/infrastructure/startup/state_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawGroupStartupService from '#legislature/infrastructure/startup/law_group_startup_service';

@inject()
export class StartupService {
  constructor(
    private readonly politicalPartyStartupService: PoliticalPartyStartupService,
    private readonly eventStartupService: EventStartupService,
    private readonly parliamentStartupService: ParliamentStartupService,
    private readonly senateStartupService: SenateStartupService,
    private readonly politicalPartySeatsStartupService: PoliticalPartySeatsStartupService,
    private readonly socialClassStartupService: SocialClassStartupService,
    private readonly productStartupService: ProductStartupService,
    private readonly sectorStartupService: SectorStartupService,
    private readonly stateStartupService: StateStartupService,
    private readonly lawGroupStartupService: LawGroupStartupService,
  ) {
  }

  public async initialize(gameId: number): Promise<void> {
    try {
      await this.eventStartupService.initialize(gameId);
      await this.parliamentStartupService.initialize(gameId);
      await this.senateStartupService.initialize(gameId);
      await this.politicalPartyStartupService.initialize(gameId);
      await this.politicalPartySeatsStartupService.initialize(gameId);
      await this.sectorStartupService.initialize(gameId);
      await this.socialClassStartupService.initialize(gameId);
      await this.productStartupService.initialize(gameId);
      await this.stateStartupService.initialize(gameId);
      await this.lawGroupStartupService.initialize(gameId);
    }
    catch (error) {
      console.error(error);
      throw new Error('Failed to initialize game');
    }
  }
}
