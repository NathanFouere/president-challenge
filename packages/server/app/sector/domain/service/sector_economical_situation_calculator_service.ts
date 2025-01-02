import { inject } from '@adonisjs/core';
import { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
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

import sectorEconomicalSituaitonMatchConfig from '#game-config/sector/sector-economical-situation-match-config.json' assert { type: 'json' };

@inject()
export default class SectorEconomicalSituationCalculatorService {
  constructor(
    private readonly calculateAverageMarginOfProductsService: CalculateAverageMarginOfProductsService,
    private readonly calculateAverageHappinessOfSocialClassesService: CalculateAverageMarginOfSocialClassesService,
  ) {
  }

  public async setSectorsEconomicalSituation(sectors: Sector[], state: State): Promise<void> {
    const promises = sectors.map(sector => this.setSectorEconomicalSituation(sector, state));
    await Promise.all(promises);
  }

  public async setSectorEconomicalSituation(sector: Sector, state: State): Promise<void> {
    sector.economicalSituation = this.calculateSectorEconomicalSituation(sector);
    this.propagateEconomicalSituationToSocialClasses(sector);
    this.propagateEconomicalSituationToState(sector, state);
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

  private propagateEconomicalSituationToSocialClasses(sector: Sector): void {
    for (const socialClass of sector.socialClasses) {
      const defaultSocialClassEconomicalSituation = socialClass.economicalSituation;
      switch (socialClass.type) {
        case SocialClassTypes.CAPITALIST:
          socialClass.economicalSituation = defaultSocialClassEconomicalSituation + sectorEconomicalSituaitonMatchConfig[sector.ownershipType][sector.economicalSituation].owner;
          break;
        case SocialClassTypes.PETIT_BOURGEOIS:
          socialClass.economicalSituation = defaultSocialClassEconomicalSituation + sectorEconomicalSituaitonMatchConfig[sector.ownershipType][sector.economicalSituation].owner;
          break;
        case SocialClassTypes.PROLETARIAT:
          socialClass.economicalSituation = defaultSocialClassEconomicalSituation + sectorEconomicalSituaitonMatchConfig[sector.ownershipType][sector.economicalSituation].worker;
          break;
      }
      if (socialClass.economicalSituation > 4) {
        socialClass.economicalSituation = 4;
      }
      else if (socialClass.economicalSituation < 0) {
        socialClass.economicalSituation = 0;
      }
    }
  }

  private propagateEconomicalSituationToState(sector: Sector, state: State): void {
    const defaultStateEconomicalSituation = state.economicalSituation;
    state.economicalSituation = defaultStateEconomicalSituation + sectorEconomicalSituaitonMatchConfig[sector.ownershipType][sector.economicalSituation].state;
  }
}
