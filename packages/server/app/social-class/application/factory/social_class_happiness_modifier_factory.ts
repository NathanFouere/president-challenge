import type Law from '#law/domain/model/law';
import type SocialClass from '#social-class/domain/models/social_class';
import {
  aSocialClassHappinessModifier,
} from '#social-class/application/builders/social_class_happiness_modifier_builder';
import type SocialClassLawHappinessEffect from '#social-class/domain/models/social_class_law_happiness_effect';
import type SocialClassHappinessModifier from '#social-class/domain/models/social_class_happiness_modifier';

export default class SocialClassHappinessModifierFactory {
  readonly taxHappinessModifierColor = 'red';

  public createFromLaw(law: Law, socialClassHappinessEffect: SocialClassLawHappinessEffect, socialClass: SocialClass): SocialClassHappinessModifier {
    return aSocialClassHappinessModifier()
      .withDuration(socialClassHappinessEffect.duration)
      .withAmount(socialClassHappinessEffect.happinessModifier)
      .withSocialClassId(socialClass.id)
      .withType(socialClassHappinessEffect.type)
      .withDescription(law.name)
      .withColor(this.taxHappinessModifierColor)
      .withName(law.name)
      .withLawOriginId(law.id)
      .build();
  }
}
