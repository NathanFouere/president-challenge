import { HappinessModifierType } from '@shared/dist/common/happiness-modifier-type.js';
import type SocialClass from '#social-class/domain/models/social_class';
import {
  aSocialClassHappinessModifier,
} from '#social-class/application/builders/social_class_happiness_modifier_builder';
import type SocialClassTypeLawHappinessEffect from '#social-class/domain/models/social_class_type_law_happiness_effect';
import type SocialClassHappinessModifier from '#social-class/domain/models/social_class_happiness_modifier';
import type Law from '#law/domain/model/law';
import type ChoiceDefinition from '#event/domain/models/choice_definition';
import type SocialClassTypeChoiceHappinessEffect from '#social-class/domain/models/social_class_type_choice_happiness_effect';

export default class SocialClassHappinessModifierFactory {
  // TODO => colors should be places in the dto factory
  readonly taxHappinessModifierColor = 'red';
  readonly choiceHappinessModifierColor = 'blue';
  readonly economicalSituationHappinessModifierColor = 'blue';

  public createFromLaw(law: Law, socialClassHappinessEffect: SocialClassTypeLawHappinessEffect, socialClass: SocialClass): SocialClassHappinessModifier {
    return aSocialClassHappinessModifier()
      .withDuration(socialClassHappinessEffect.duration)
      .withAmount(socialClassHappinessEffect.happinessModifier)
      .withSocialClassId(socialClass.id)
      .withType(socialClassHappinessEffect.type)
      .withDescription(law.definition.name)
      .withColor(this.taxHappinessModifierColor)
      .withName(law.definition.name)
      .withLawOriginId(law.id)
      .build();
  }

  public createFromChoice(choiceDefinition: ChoiceDefinition, socialClassChoiceHappinessEffect: SocialClassTypeChoiceHappinessEffect, socialClass: SocialClass): SocialClassHappinessModifier {
    return aSocialClassHappinessModifier()
      .withDuration(socialClassChoiceHappinessEffect.duration)
      .withAmount(socialClassChoiceHappinessEffect.happinessModifier)
      .withSocialClassId(socialClass.id)
      .withType(socialClassChoiceHappinessEffect.type)
      .withDescription(choiceDefinition.text)
      .withColor(this.choiceHappinessModifierColor)
      .withName(choiceDefinition.text)
      .build();
  }

  public createFromEconomicalSituation(socialClass: SocialClass): SocialClassHappinessModifier {
    return aSocialClassHappinessModifier()
      .withName('Economical Situation')
      .withDescription('Economical Situation')
      .withColor(this.economicalSituationHappinessModifierColor)
      .withType(HappinessModifierType.TEMPORARY)
      .withDuration(1)
      .withAmount(socialClass.getHappinessModifierValueFromEconomicalSituation())
      .withSocialClassId(socialClass.id)
      .build();
  }
}
