import { inject } from '@adonisjs/core';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SectorEconomicalSituationCalculatorService
  from '#sector/domain/service/sector_economical_situation_calculator_service';
import type { TurnDataContext } from '#game/application/service/turn-service/load_turn_data_context_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import StateTurnFinancialFlowService from '#state/domain/service/state_turn_financial_flow_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassEconomicalSituationEvolutionService
  from '#social-class/domain/service/social_class_economic_situation_evolution_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ProductPriceRandomizerService } from '#product/domain/service/product_price_randomizer_service';
import type { TurnProcessorStep } from '#game/application/service/turn-service/turn_processor_step';

@inject()
export default class TurnEconomicalService implements TurnProcessorStep {
  constructor(
    private readonly sectorEconomicalSituationCalculatorService: SectorEconomicalSituationCalculatorService,
    private readonly stateEconomicalSituationEvolutionService: StateTurnFinancialFlowService,
    private readonly socialClassEconomicalSituationEvolutionService: SocialClassEconomicalSituationEvolutionService,
    private readonly productChangePriceTurnService: ProductPriceRandomizerService,
  ) {
  }

  public async execute(turnDataContext: TurnDataContext): Promise<void> {
    await this.sectorEconomicalSituationCalculatorService.setSectorsEconomicalSituation(turnDataContext.sectors);
    await this.stateEconomicalSituationEvolutionService.createStateTurnFinancialFlow(turnDataContext.sectors, turnDataContext.state, turnDataContext.game.turn);
    this.socialClassEconomicalSituationEvolutionService.propagateEconomicalSituationToSocialClasses(turnDataContext.socialClasses);
    this.productChangePriceTurnService.changeProductsPricesRandomly(turnDataContext.products);
  }
}
