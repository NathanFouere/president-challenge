import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ApplySectorPropertyLawEffectService
  from '#law/application/service/law-effect/apply_sector_property_law_effect_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ApplyBudgetLawEffectService from '#law/application/service/law-effect/apply_budget_law_effect_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ApplyTaxLawEffectService from '#law/application/service/law-effect/apply_tax_law_effect_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassHappinessLawEffectService
  from '#law/application/service/law-effect/social_class_happiness_law_effect_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ApplyPoliticalPartiesHappinessLawEffectService
  from '#law/application/service/law-effect/apply_political_parties_happiness_law_effect_service';
import { LawType } from '#law/domain/model/law_type';
import type Law from '#law/domain/model/law';

@inject()
export default class ApplyLawEffectService {
  constructor(
    private readonly applyBudgetLawEffectService: ApplyBudgetLawEffectService,
    private readonly applyTaxLawEffectService: ApplyTaxLawEffectService,
    private readonly applySectorPropertyLawEffectService: ApplySectorPropertyLawEffectService,
    private readonly applySocialClassesHappinessEffects: SocialClassHappinessLawEffectService,
    private readonly applyPoliticalPartiesHappinessEffects: ApplyPoliticalPartiesHappinessLawEffectService,
  ) {
  }

  public async applyLawEffect(law: Law, gameId: number): Promise<void> {
    switch (law.definition.type) {
      case LawType.BUDGET_LEVEL:
        await this.applyBudgetLawEffectService.apply(law);
        break;
      case LawType.TAX_LEVEL:
        await this.applyTaxLawEffectService.apply(law);
        break;
      case LawType.SECTOR_PROPERTY:
        await this.applySectorPropertyLawEffectService.apply(law);
        break;
      default:
        throw new Error(`Unknown law type: ${law.definition.type}`);
    }

    await Promise.all([
      this.applySocialClassesHappinessEffects.applySocialClassesHappinessEffects(law, gameId),
      this.applyPoliticalPartiesHappinessEffects.applyPoliticalPartiesHappinessEffects(law, gameId),
    ]);
  }
}
