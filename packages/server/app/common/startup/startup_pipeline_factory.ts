import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PoliticalPartyStartupService } from '#political-party/infrastructure/startup/political_party_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ParliamentStartupService } from '#legislature/infrastructure/startup/parliament_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SenateStartupService } from '#legislature/infrastructure/startup/senate_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PoliticalPartySeatsStartupService } from '#legislature/infrastructure/startup/political_party_seats_startup_service';
import { StartupPipeline } from '#common/startup/startup_pipeline';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { TaxStartupService } from '#tax/infrastructure/startup/tax_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawStartupService from '#law/infrastructure/startup/law_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { EventStartupService } from '#event/infrastructure/startup/event_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SocialClassStartupService } from '#social-class/infrastructure/startup/social_class_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SectorStartupService } from '#sector/infrastructure/startup/sector_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ProductStartupService } from '#product/infrastructure/startup/product_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import StateStartupService from '#state/infrastructure/startup/state_startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import BudgetStartupService from '#budget/infrastructure/startup/budget_startup_service';

@inject()
export default class StartupPipelineFactory {
  constructor(
    private readonly politicalPartyStartupService: PoliticalPartyStartupService,
    private readonly parliamentStartupService: ParliamentStartupService,
    private readonly senateStartupService: SenateStartupService,
    private readonly politicalPartySeatsStartupService: PoliticalPartySeatsStartupService,
    private readonly stateStartupService: StateStartupService,
    private readonly taxStartupService: TaxStartupService,
    private readonly lawStartupService: LawStartupService,
    private readonly eventStartupService: EventStartupService,
    private readonly socialClassStartupService: SocialClassStartupService,
    private readonly sectorStartupService: SectorStartupService,
    private readonly productStartupService: ProductStartupService,
    private readonly budgetStartupService: BudgetStartupService,
  ) {
  }

  public create(gameId: number, gameDefinitionIdentifier: string): StartupPipeline {
    return new StartupPipeline(
      [
        this.parliamentStartupService,
        this.sectorStartupService,
        this.productStartupService,
        this.senateStartupService,
        this.politicalPartyStartupService,
        this.politicalPartySeatsStartupService,
        this.stateStartupService,
        this.taxStartupService,
        this.budgetStartupService,
        this.eventStartupService,
        this.socialClassStartupService,
        this.lawStartupService,
      ],
      gameId,
      gameDefinitionIdentifier,
    );
  }
}
