import type SocialClass from '#social-class/domain/models/social_class';

export default class SocialClassesAverageHappinessCalculatorService {
  public calculateAverageHappiness(socialClasses: SocialClass[]): number {
    const totalHappiness = socialClasses.reduce((acc, socialClass) => acc + socialClass.getHappinessLevel(), 0);
    return totalHappiness / socialClasses.length;
  }
}
