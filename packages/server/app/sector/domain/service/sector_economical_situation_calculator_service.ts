import * as console from 'node:console';
import { inject } from '@adonisjs/core';
import type { SectorEconomicalSituation } from '@shared/dist/sector/sector-economical-situation.js';
import { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import type Sector from '#sector/domain/model/sector';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SectorRepository from '#sector/infrastructure/repository/sector_repository';
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
import SocialClassRepository from '#social-class/infrastructure/repository/social_class_repository';

@inject()
export default class SectorEconomicalSituationCalculatorService {
  constructor(
    private readonly sectorRepository: SectorRepository,
    private readonly calculateAverageMarginOfProductsService: CalculateAverageMarginOfProductsService,
    private readonly calculateAverageHappinessOfSocialClassesService: CalculateAverageMarginOfSocialClassesService,
    private readonly socialClassRepository: SocialClassRepository,
  ) {
  }

  public async setSectorsEconomicalSituation(sectors: Sector[], state: State): Promise<void> {
    const promises = sectors.map(sector => this.setSectorEconomicalSituation(sector, state));
    await Promise.all(promises);
  }

  public async setSectorEconomicalSituation(sector: Sector, state: State): Promise<void> {
    sector.economicalSituation = this.calculateSectorEconomicalSituation(sector);
    await this.sectorRepository.save(sector);
    this.setConsequences(sector, state);
    await this.socialClassRepository.saveMany(sector.socialClasses);
  }

  private calculateSectorEconomicalSituation(sector: Sector): number {
    const averageMarginOfProducts = this.calculateAverageMarginOfProductsService.calculateAverageMarginOfProducts(sector.products);
    const averageHappinessOfSocialClasses = this.calculateAverageHappinessOfSocialClassesService.calculateAverageHappinessOfSocialClasses(sector.socialClasses);

    let result = Math.floor(((averageMarginOfProducts + averageHappinessOfSocialClasses) / 2) * 5);
    if (result > 5) {
      result = 5;
    }
    else if (result < 0) {
      result = 0;
    }
    return result;
  }

  private setConsequences(sector: Sector, state: State): void {
    for (const socialClass of sector.socialClasses) {
      const defaultSocialClassEconomicalSituation = socialClass.economicalSituation;
      switch (socialClass.type) {
        case SocialClassTypes.CAPITALIST:
          socialClass.economicalSituation = defaultSocialClassEconomicalSituation + modifiers[sector.ownershipType][sector.economicalSituation].owner;
          break;
        case SocialClassTypes.PETIT_BOURGEOIS:
          socialClass.economicalSituation = defaultSocialClassEconomicalSituation + modifiers[sector.ownershipType][sector.economicalSituation].owner;
          break;
        case SocialClassTypes.PROLETARIAT:
          console.log('sector.ownershipType', sector.economicalSituation, modifiers[sector.ownershipType][sector.economicalSituation].worker);
          socialClass.economicalSituation = defaultSocialClassEconomicalSituation + modifiers[sector.ownershipType][sector.economicalSituation].worker;
          break;
      }
    }

    const defaultStateEconomicalSituation = state.economicalSituation;
    state.economicalSituation = defaultStateEconomicalSituation + modifiers[sector.ownershipType][sector.economicalSituation].state;
  }
}

// TODO => déplacer dans json
interface Modifiers {
  owner: number;
  worker: number;
  state: number;
}

type ModifierTable = Record<SectorEconomicalSituation, Modifiers>;

type ModifierRules = Record<SectorOwnershipType, ModifierTable>;

const modifiers: ModifierRules = {
  PRIVATE: {
    0: { owner: -2, worker: -2, state: -1 },
    1: { owner: -1, worker: -1, state: 0 },
    2: { owner: 0, worker: -1, state: 0 },
    3: { owner: 1, worker: 1, state: 1 },
    4: { owner: 2, worker: 1, state: 2 },
  },
  MIXED: {
    0: { owner: -1, worker: -1, state: -1 },
    1: { owner: -1, worker: -1, state: 0 },
    2: { owner: 0, worker: 0, state: 0 },
    3: { owner: 1, worker: 1, state: 1 },
    4: { owner: 2, worker: 2, state: 2 },
  },
  PUBLIC: {
    0: { owner: 0, worker: -1, state: -2 },
    1: { owner: 0, worker: -1, state: -1 },
    2: { owner: 0, worker: 0, state: -1 },
    3: { owner: 0, worker: 1, state: 1 },
    4: { owner: 0, worker: 2, state: 2 },
  },
};
