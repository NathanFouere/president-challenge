import * as console from 'node:console';
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

@inject()
export default class SectorEconomicalSituationCalculatorService {
  constructor(
    private readonly calculateAverageMarginOfProductsService: CalculateAverageMarginOfProductsService,
    private readonly calculateAverageHappinessOfSocialClassesService: CalculateAverageMarginOfSocialClassesService,
  ) {
  }

  public async setSectorsEconomicalSituation(sectors: Sector[]): Promise<void> {
    const promises = sectors.map(sector => this.setSectorEconomicalSituation(sector));
    await Promise.all(promises);
  }

  public async setSectorEconomicalSituation(sector: Sector): Promise<void> {
    sector.economicalSituation = this.calculateSectorEconomicalSituation(sector);
  }

  public calculateSectorEconomicalSituation(sector: Sector): number {
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
