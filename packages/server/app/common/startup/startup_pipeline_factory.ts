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
import LawStartupService from '#legislature/infrastructure/startup/law_startup_service';
import { StartupPipeline } from '#common/startup/startup_pipeline';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { TaxStartupService } from '#tax/infrastructure/startup/tax_startup_service';

@inject()
export default class StartupPipelineFactory {
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
    private readonly lawGroupStartupService: LawStartupService,
    private readonly taxStartupService: TaxStartupService,
  ) {
  }

  public create(gameId: number): StartupPipeline {
    return new StartupPipeline(
      [
        this.eventStartupService,
        this.parliamentStartupService,
        this.senateStartupService,
        this.politicalPartyStartupService,
        this.politicalPartySeatsStartupService,
        this.sectorStartupService,
        this.socialClassStartupService,
        this.productStartupService,
        this.stateStartupService,
        this.lawGroupStartupService,
        this.taxStartupService,
      ],
      gameId,
    );
  }
}
