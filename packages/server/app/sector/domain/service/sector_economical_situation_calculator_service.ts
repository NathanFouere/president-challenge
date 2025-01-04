import { inject } from '@adonisjs/core';
import type Sector from '#sector/domain/model/sector';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  CalculateAverageMarginOfProductsService,
} from '#product/domain/service/calculate_average_margin_of_products_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  CalculateAverageMarginOfSocialClassesService,
} from '#social-class/domain/service/calculate_average_happiness_of_social_classes_service';
import type State from '#state/domain/model/state';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassEconomicalSituationEvolutionService
  from '#social-class/domain/service/social_class_economic_situation_evolution_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import StateEconomicalSituationEvolutionService from '#state/domain/service/state_economic_situation_evolution_service';

@inject()
export default class SectorEconomicalSituationCalculatorService {
  constructor(
    private readonly calculateAverageMarginOfProductsService: CalculateAverageMarginOfProductsService,
    private readonly calculateAverageHappinessOfSocialClassesService: CalculateAverageMarginOfSocialClassesService,
    private readonly socialClassEconomicalSituationEvolutionService: SocialClassEconomicalSituationEvolutionService,
    private readonly stateEconomicalSituationEvolutionService: StateEconomicalSituationEvolutionService,
  ) {
  }

  public async setSectorsEconomicalSituation(sectors: Sector[], state: State): Promise<void> {
    const promises = sectors.map(sector => this.setSectorEconomicalSituation(sector, state));
    await Promise.all(promises);
  }

  public async setSectorEconomicalSituation(sector: Sector, state: State): Promise<void> {
    sector.economicalSituation = this.calculateSectorEconomicalSituation(sector);
    this.socialClassEconomicalSituationEvolutionService.propagateSectorEconomicalSituationToSocialClasses(sector);
    this.stateEconomicalSituationEvolutionService.propagateEconomicalSituationToState(sector, state);
  }

  private calculateSectorEconomicalSituation(sector: Sector): number {
    const averageMarginOfProducts = this.calculateAverageMarginOfProductsService.calculateAverageMarginOfProducts(sector.products);
    const averageHappinessOfSocialClasses = this.calculateAverageHappinessOfSocialClassesService.calculateAverageHappinessOfSocialClasses(sector.socialClasses);

    let result = Math.floor(((averageMarginOfProducts + averageHappinessOfSocialClasses) / 2) * 5);
    if (result > 4) {
      result = 4;
    }
    else if (result < 0) {
      result = 0;
    }
    return result;
  }
}
