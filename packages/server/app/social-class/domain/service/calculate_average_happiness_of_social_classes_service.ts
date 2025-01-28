import type SocialClass from '#social-class/domain/models/social_class';

export class CalculateAverageMarginOfSocialClassesService {
  public calculateAverageHappinessOfSocialClasses(socialClasses: SocialClass[]): number {
    if (0 === socialClasses.length) {
      return 0;
    }
    return socialClasses.reduce((happinessSum, socialClass) => happinessSum + socialClass.getHappinessLevel(), 0) / socialClasses.length;
  }
}
