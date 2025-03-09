import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassesAverageHappinessCalculatorService
  from '#social-class/domain/service/social_classes_average_happiness_calculator_service';
import type SocialClass from '#social-class/domain/models/social_class';

@inject()
export default class DefeatSocialClassUnhappinessService {
  constructor(
    private readonly socialClassesAverageHappinessCalculatorService: SocialClassesAverageHappinessCalculatorService,
  ) {
  }

  public async checkDefeatSocialClassUnhappiness(socialClasses: SocialClass[]): Promise<boolean> {
    const averageHappiness = this.socialClassesAverageHappinessCalculatorService.calculateAverageHappiness(socialClasses);

    return averageHappiness == 0;
  };
}
