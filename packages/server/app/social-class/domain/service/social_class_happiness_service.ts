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
    socialClass.happinessModifiers.push(
      aSocialClassHappinessModifier()
        .withName('Economical Situation Evolution')
        .withDescription('Economical Situation Evolution')
        .withColor('blue') // TODO => change this
        .withType(HappinessModifierType.TEMPORARY)
        .withDuration(1)
        .withAmount(1)
        .withSocialClassId(socialClass.id)
        .build(),
    );
  }
}
