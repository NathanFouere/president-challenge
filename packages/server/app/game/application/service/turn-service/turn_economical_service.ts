import { inject } from '@adonisjs/core';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SectorEconomicalSituationCalculatorService
  from '#sector/domain/service/sector_economical_situation_calculator_service';
import type { TurnDataContext } from '#game/application/service/turn-service/load_turn_data_context_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassEconomicalSituationEvolutionService
  from '#social-class/domain/service/social_class_economic_situation_evolution_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ProductPriceRandomizerService } from '#product/domain/service/product_price_randomizer_service';
import type { TurnProcessorStep } from '#game/application/service/turn-service/turn_processor_step';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SectorService from '#sector/domain/service/sector_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import BudgetService from '#state/domain/service/budget_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import TaxService from '#tax/domain/service/tax_service';

@inject()
export default class TurnEconomicalService implements TurnProcessorStep {
  constructor(
    private readonly sectorEconomicalSituationCalculatorService: SectorEconomicalSituationCalculatorService,
    private readonly socialClassEconomicalSituationEvolutionService: SocialClassEconomicalSituationEvolutionService,
    private readonly productChangePriceTurnService: ProductPriceRandomizerService,
    private readonly sectorService: SectorService,
    private readonly budgetService: BudgetService,
    private readonly taxService: TaxService,

  ) {
  }

  public async execute(turnDataContext: TurnDataContext): Promise<void> {
    await this.sectorEconomicalSituationCalculatorService.setSectorsEconomicalSituation(turnDataContext.sectors);
    await this.socialClassEconomicalSituationEvolutionService.updateSocialClassesEconomicalSituation(turnDataContext.socialClassesTurnContexts);
    this.productChangePriceTurnService.changeProductsPricesRandomly(turnDataContext.products);
    await Promise.all([
      this.sectorService.updateSectorsEconomicalSituation(
        turnDataContext.sectors,
        turnDataContext.stateTurnContext,
      ),
      this.budgetService.updateStateFinancesFromBudgets(
        turnDataContext.budgets,
        turnDataContext.stateTurnContext,
      ),
      this.taxService.applyTaxes(
        turnDataContext.taxes,
        turnDataContext.socialClassesTurnContexts,
        turnDataContext.stateTurnContext,
      ),
    ]);
  }
}
