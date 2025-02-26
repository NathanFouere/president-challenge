import { HappinessModifierType } from '@shared/dist/common/happiness-modifier-type.js';
import type SocialClass from '#social-class/domain/models/social_class';
import {
  aSocialClassHappinessModifier,
} from '#social-class/application/builders/social_class_happiness_modifier_builder';

export default class SocialClassHappinessService {
  public updateSocialClassesHappiness(socialClasses: SocialClass[]): void {
    socialClasses.forEach((socialClass) => {
      this.addHappinessModifierFromEconomicalSituation(socialClass);
    });
  }

  private addHappinessModifierFromEconomicalSituation(socialClass: SocialClass): void {
    // TODO => mettre dans une factory
    socialClass.happinessModifiers.push(
      aSocialClassHappinessModifier()
        .withName('Economical Situation')
        .withDescription('Economical Situation')
        .withColor('blue')
        .withType(HappinessModifierType.TEMPORARY)
        .withDuration(1)
        .withAmount(socialClass.getHappinessModifierValueFromEconomicalSituation())
        .withSocialClassId(socialClass.id)
        .build(),
    );
  }
}
