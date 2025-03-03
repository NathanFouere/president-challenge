import { inject } from '@adonisjs/core';
import type SocialClass from '#social-class/domain/models/social_class';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassHappinessModifierFactory
  from '#social-class/application/factory/social_class_happiness_modifier_factory';

@inject()
export default class SocialClassHappinessService {
  constructor(
    private readonly socialClassHappinessModifierFactory: SocialClassHappinessModifierFactory,
  ) {
  }

  public updateSocialClassesHappiness(socialClasses: SocialClass[]): void {
    socialClasses.forEach((socialClass) => {
      this.socialClassHappinessModifierFactory.createFromEconomicalSituation(socialClass);
    });
  }
}
