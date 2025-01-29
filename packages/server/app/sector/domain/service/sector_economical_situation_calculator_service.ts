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

  public setSectorsEconomicalSituation(sectors: Sector[]): void {
    sectors.forEach(sector => sector.setEconomicalSituation(this.calculateSectorEconomicalSituation(sector)));
  }

  public calculateSectorEconomicalSituation(sector: Sector): number {
    const averageMarginOfProducts = this.calculateAverageMarginOfProductsService.calculateAverageMarginOfProducts(sector.products);
    const averageHappinessOfSocialClasses = this.calculateAverageHappinessOfSocialClassesService.calculateAverageHappinessOfSocialClasses(sector.socialClasses);

    return Math.floor(((averageMarginOfProducts + averageHappinessOfSocialClasses) / 2) * 5);
  }
}
