import { inject } from '@adonisjs/core';
import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import lawEffectStartupConfig from '#game-config/law/laws-effect-startup-config.json' assert { type: 'json' };
import { aLawEffect } from '#law/application/builder/law-effect/law_effect_builder';
import { LawEffectType } from '#law/domain/model/law-effect/law_effect_type';
import type { BudgetType } from '#state/domain/model/budget_type';
import type { TaxType } from '#tax/domain/model/tax_type';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ILawEffectRepository from '#law/domain/repository/i_law_effect_repository';

@inject()
export default class LawEffectStartupService {
  constructor(
    private readonly lawEffectRepository: ILawEffectRepository,
  ) {
  }

  public async createLawEffects(): Promise<void> {
    const lawEffects = [];

    for (const effect of lawEffectStartupConfig.budgetEffects) {
      const lawEffect = aLawEffect()
        .withIdentifier(effect.identifier)
        .withType(LawEffectType.BUDGET_LEVEL)
        .withBudgetTypeToChange(effect.budgetType as BudgetType)
        .withBudgetLevelToChange(effect.budgetLevel)
        .build();
      lawEffects.push(lawEffect);
    }

    for (const effect of lawEffectStartupConfig.taxEffects) {
      const lawEffect = aLawEffect()
        .withIdentifier(effect.identifier)
        .withType(LawEffectType.TAX_LEVEL)
        .withTaxTypeToChange(effect.taxType as TaxType)
        .withTaxLevelToChange(effect.taxLevel)
        .build();
      lawEffects.push(lawEffect);
    }

    for (const effect of lawEffectStartupConfig.sectorPropertyEffects) {
      const lawEffect = aLawEffect()
        .withIdentifier(effect.identifier)
        .withType(LawEffectType.SECTOR_PROPERTY)
        .withSectorTypeToChange(effect.sectorType as SectorTypes)
        .withSectorOwnershipTypeToChange(effect.ownershipType as SectorOwnershipType)
        .build();
      lawEffects.push(lawEffect);
    }

    await this.lawEffectRepository.saveOrUpdateAll(lawEffects);
  }
}
