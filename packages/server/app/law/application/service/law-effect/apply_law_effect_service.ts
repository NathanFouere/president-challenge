import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ApplySectorPropertyLawEffectService
  from '#law/application/service/law-effect/apply_sector_property_law_effect_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ApplyBudgetLawEffectService from '#law/application/service/law-effect/apply_budget_law_effect_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ApplyTaxLawEffectService from '#law/application/service/law-effect/apply_tax_law_effect_service';
import type LawEffect from '#law/domain/model/law-effect/law_effect';
import { LawEffectType } from '#law/domain/model/law-effect/law_effect_type';

@inject()
export default class ApplyLawEffectService {
  constructor(
    private readonly applyBudgetLawEffectService: ApplyBudgetLawEffectService,
    private readonly applyTaxLawEffectService: ApplyTaxLawEffectService,
    private readonly applySectorPropertyLawEffectService: ApplySectorPropertyLawEffectService,
  ) {
  }

  public async applyLawEffect(lawEffect: LawEffect, gameId: number): Promise<void> {
    switch (lawEffect.type) {
      case LawEffectType.BUDGET_LEVEL:
        await this.applyBudgetLawEffectService.apply(lawEffect, gameId);
        break;
      case LawEffectType.TAX_LEVEL:
        await this.applyTaxLawEffectService.apply(lawEffect, gameId);
        break;
      case LawEffectType.SECTOR_PROPERTY:
        await this.applySectorPropertyLawEffectService.apply(lawEffect, gameId);
        break;
      default:
        throw new Error(`Unknown law effect type: ${lawEffect.type}`);
    }
  }
}
