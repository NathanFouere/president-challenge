import { inject } from '@adonisjs/core';

import type { GameTurnProcessStreamData } from '@president-challenge/shared/dist/game/game-turn-process-stream-data.js';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SectorEconomicalSituationCalculatorService
  from '#sector/domain/service/sector_economical_situation_calculator_service';
import type { TurnDataContext } from '#game/application/service/turn-service/load_turn_data_context_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassEconomicalSituationEvolutionService
  from '#social-class/domain/service/social_class_economic_situation_evolution_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ProductPriceRandomizerService } from '#product/domain/service/product_price_randomizer_service';
import { TurnProcessorStep } from '#game/application/service/turn-service/turn_processor_step';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import StateEconomicalSituationService from '#sector/domain/service/state_economical_situation_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import BudgetService from '#budget/domain/service/budget_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import TaxService from '#tax/domain/service/tax_service';

@inject()
export default class TurnEconomicalService extends TurnProcessorStep {
  constructor(
    private readonly sectorEconomicalSituationCalculatorService: SectorEconomicalSituationCalculatorService,
    private readonly socialClassEconomicalSituationEvolutionService: SocialClassEconomicalSituationEvolutionService,
    private readonly productChangePriceTurnService: ProductPriceRandomizerService,
    private readonly sectorService: StateEconomicalSituationService,
    private readonly budgetService: BudgetService,
    private readonly taxService: TaxService,
  ) {
    super('Processing economical situation');
  }

  public async execute(turnDataContext: TurnDataContext, gameTurnProcessStreamContainer: GameTurnProcessStreamData): Promise<void> {
    super.updateStreamData(gameTurnProcessStreamContainer);
    this.sectorEconomicalSituationCalculatorService.setSectorsEconomicalSituation(turnDataContext.sectors);

    this.socialClassEconomicalSituationEvolutionService.updateSocialClassesEconomicalSituation(
      turnDataContext.socialClasses,
      turnDataContext.game.turn,
    );

    this.productChangePriceTurnService.changeProductsPricesRandomly(turnDataContext.products);

    this.sectorService.updateStateEconomicalSituationFromSectors(
      turnDataContext.sectors,
      turnDataContext.state,
      turnDataContext.game.turn,
    );

    this.budgetService.updateStateFinancesFromBudgets(
      turnDataContext.state,
      turnDataContext.game.turn,
    );

    this.taxService.applyTaxes(
      turnDataContext.taxes,
      turnDataContext.socialClasses,
      turnDataContext.state,
      turnDataContext.game.turn,
    );
  }
}
