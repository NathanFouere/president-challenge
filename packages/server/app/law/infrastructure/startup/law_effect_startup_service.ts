import { inject } from '@adonisjs/core';
import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import type { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
import type { HappinessModifierType } from '@shared/dist/common/happiness-modifier-type.js';
import type { PoliticalAffiliation } from '@shared/dist/political-party/political-affiliation.js';
import lawEffectStartupConfig from '#game-config/law/laws-effect-startup-config.json' assert { type: 'json' };
import { aLawEffect } from '#law/application/builder/law-effect/law_effect_builder';
import { LawEffectType } from '#law/domain/model/law-effect/law_effect_type';
import type { BudgetType } from '#state/domain/model/budget_type';
import type { TaxType } from '#tax/domain/model/tax_type';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ILawEffectRepository from '#law/domain/repository/i_law_effect_repository';
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

@inject()
export default class LawEffectStartupService {
  constructor(
    private readonly lawEffectRepository: ILawEffectRepository,
    private readonly socialClassLawHappinessEffectRepository: ISocialClassLawHappinessEffectRepository,
    private readonly politicalAffiliationsHappinessEffectRepository: IPoliticalAffiliationLawHappinessEffectRepository,
  ) {
  }

  public async createLawEffects(): Promise<void> {
    const lawEffects = [];
    const socialClassHappinessEffects = [];
    const politicalAffiliationHappinessEffects = [];

    for (const effect of lawEffectStartupConfig.budgetEffects) {
      const lawEffect = aLawEffect()
        .withIdentifier(effect.identifier)
        .withType(LawEffectType.BUDGET_LEVEL)
        .withBudgetTypeToChange(effect.budgetType as BudgetType)
        .withBudgetLevelToChange(effect.budgetLevel)
        .build();
      for (const socialClassHappinessEffect of effect.socialClassHappinessEffects) {
        socialClassHappinessEffects.push(
          aSocialClassLawHappinessEffect()
            .withLawEffectIdentifier(effect.identifier)
            .withIdentifier(socialClassHappinessEffect.identifier)
            .withDuration(socialClassHappinessEffect.duration)
            .withType(socialClassHappinessEffect.type as HappinessModifierType)
            .withSocialClassType(socialClassHappinessEffect.socialClassType as SocialClassTypes)
            .withHappinessModifier(socialClassHappinessEffect.modifier)
            .build(),
        );
      }
      for (const politicalAffiliationHappinessEffect of effect.politicalAffiliationsHappinessEffects) {
        politicalAffiliationHappinessEffects.push(
          aPoliticalAffiliationLawHappinessEffect()
            .withLawEffectIdentifier(effect.identifier)
            .withIdentifier(politicalAffiliationHappinessEffect.identifier)
            .withDuration(politicalAffiliationHappinessEffect.duration)
            .withType(politicalAffiliationHappinessEffect.type as HappinessModifierType)
            .withPoliticalAffiliation(politicalAffiliationHappinessEffect.politicalAffiliationType as PoliticalAffiliation)
            .withHappinessModifier(politicalAffiliationHappinessEffect.modifier)
            .build(),
        );
      }
      lawEffects.push(lawEffect);
    }

    for (const effect of lawEffectStartupConfig.taxEffects) {
      const lawEffect = aLawEffect()
        .withIdentifier(effect.identifier)
        .withType(LawEffectType.TAX_LEVEL)
        .withTaxTypeToChange(effect.taxType as TaxType)
        .withTaxLevelToChange(effect.taxLevel)
        .build();
      for (const socialClassHappinessEffect of effect.socialClassHappinessEffects) {
        socialClassHappinessEffects.push(
          aSocialClassLawHappinessEffect()
            .withLawEffectIdentifier(effect.identifier)
            .withIdentifier(socialClassHappinessEffect.identifier)
            .withDuration(socialClassHappinessEffect.duration)
            .withType(socialClassHappinessEffect.type as HappinessModifierType)
            .withSocialClassType(socialClassHappinessEffect.socialClassType as SocialClassTypes)
            .withHappinessModifier(socialClassHappinessEffect.modifier)
            .build(),
        );
      }

      for (const politicalAffiliationHappinessEffect of effect.politicalAffiliationsHappinessEffects) {
        politicalAffiliationHappinessEffects.push(
          aPoliticalAffiliationLawHappinessEffect()
            .withLawEffectIdentifier(effect.identifier)
            .withIdentifier(politicalAffiliationHappinessEffect.identifier)
            .withDuration(politicalAffiliationHappinessEffect.duration)
            .withType(politicalAffiliationHappinessEffect.type as HappinessModifierType)
            .withPoliticalAffiliation(politicalAffiliationHappinessEffect.politicalAffiliationType as PoliticalAffiliation)
            .withHappinessModifier(politicalAffiliationHappinessEffect.modifier)
            .build(),
        );
      }
      lawEffects.push(lawEffect);
    }

    for (const effect of lawEffectStartupConfig.sectorPropertyEffects) {
      const lawEffect = aLawEffect()
        .withIdentifier(effect.identifier)
        .withType(LawEffectType.SECTOR_PROPERTY)
        .withSectorTypeToChange(effect.sectorType as SectorTypes)
        .withSectorOwnershipTypeToChange(effect.ownershipType as SectorOwnershipType)
        .build();
      for (const socialClassHappinessEffect of effect.socialClassHappinessEffects) {
        socialClassHappinessEffects.push(
          aSocialClassLawHappinessEffect()
            .withLawEffectIdentifier(effect.identifier)
            .withIdentifier(socialClassHappinessEffect.identifier)
            .withDuration(socialClassHappinessEffect.duration)
            .withType(socialClassHappinessEffect.type as HappinessModifierType)
            .withSocialClassType(socialClassHappinessEffect.socialClassType as SocialClassTypes)
            .withHappinessModifier(socialClassHappinessEffect.modifier)
            .build(),
        );
      }

      for (const politicalAffiliationHappinessEffect of effect.politicalAffiliationsHappinessEffects) {
        politicalAffiliationHappinessEffects.push(
          aPoliticalAffiliationLawHappinessEffect()
            .withLawEffectIdentifier(effect.identifier)
            .withIdentifier(politicalAffiliationHappinessEffect.identifier)
            .withDuration(politicalAffiliationHappinessEffect.duration)
            .withType(politicalAffiliationHappinessEffect.type as HappinessModifierType)
            .withPoliticalAffiliation(politicalAffiliationHappinessEffect.politicalAffiliationType as PoliticalAffiliation)
            .withHappinessModifier(politicalAffiliationHappinessEffect.modifier)
            .build(),
        );
      }
      lawEffects.push(lawEffect);
    }

    await this.lawEffectRepository.saveOrUpdateAll(lawEffects);
    await this.socialClassLawHappinessEffectRepository.saveOrUpdateAll(socialClassHappinessEffects);
    await this.politicalAffiliationsHappinessEffectRepository.saveOrUpdateAll(politicalAffiliationHappinessEffects);
  }
}
