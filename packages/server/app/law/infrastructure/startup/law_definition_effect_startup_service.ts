import { inject } from '@adonisjs/core';
import type { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
import type { HappinessModifierType } from '@shared/dist/common/happiness-modifier-type.js';
import type { PoliticalAffiliation } from '@shared/dist/political-party/political-affiliation.js';

import {
  aSocialClassLawHappinessEffect,
} from '#social-class/application/builders/social_class_law_happiness_effect_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISocialClassLawHappinessEffectRepository
  from '#social-class/domain/repository/i_social_class_law_happiness_effect_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalAffiliationLawHappinessEffectRepository
  from '#political-party/domain/repository/i_political_affiliation_law_happiness_effect_repository';
import {
  aPoliticalAffiliationLawHappinessEffect,
} from '#political-party/application/builders/political_affiliation_law_happiness_effect_builder';
import type { LawStartupInterface } from '#law/infrastructure/startup/startup-interface/law_startup_interface';

@inject()
export default class LawDefinitionEffectStartupService {
  constructor(
    private readonly socialClassLawHappinessEffectRepository: ISocialClassLawHappinessEffectRepository,
    private readonly politicalAffiliationsHappinessEffectRepository: IPoliticalAffiliationLawHappinessEffectRepository,
  ) {
  }

  public async createSocialClassHappinessEffects(lawId: number, lawStartup: LawStartupInterface): Promise<void> {
    const socialClassHappinessEffects = [];
    for (const effect of lawStartup.socialClassHappinessEffects) {
      socialClassHappinessEffects.push(
        aSocialClassLawHappinessEffect()
          .withLawDefinitionId(lawId)
          .withDuration(effect.duration)
          .withType(effect.type as HappinessModifierType)
          .withSocialClassType(effect.socialClassType as SocialClassTypes)
          .withHappinessModifier(effect.modifier)
          .build(),
      );
    }

    await this.socialClassLawHappinessEffectRepository.createMany(socialClassHappinessEffects);
  }

  public async createPoliticalAffiliationHappinessEffects(lawId: number, lawStartup: LawStartupInterface): Promise<void> {
    const politicalAffiliationHappinessEffects = [];
    for (const effect of lawStartup.politicalAffiliationsHappinessEffects) {
      politicalAffiliationHappinessEffects.push(
        aPoliticalAffiliationLawHappinessEffect()
          .withLawDefinitionId(lawId)
          .withDuration(effect.duration)
          .withType(effect.type as HappinessModifierType)
          .withPoliticalAffiliation(effect.politicalAffiliation as PoliticalAffiliation)
          .withHappinessModifier(effect.modifier)
          .build(),
      );
    }

    await this.politicalAffiliationsHappinessEffectRepository.createMany(politicalAffiliationHappinessEffects);
  }
}
