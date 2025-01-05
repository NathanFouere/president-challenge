import { test } from '@japa/runner';
import type SocialClass from '#social-class/domain/models/social_class';
import {
  CalculateAverageMarginOfSocialClassesService,
} from '#social-class/domain/service/calculate_average_happiness_of_social_classes_service';

test.group('CalculateAverageMarginOfSocialClassesService', () => {
  test('should return 0 if the list of social classes is empty', async ({ assert }) => {
    const service = new CalculateAverageMarginOfSocialClassesService();
    const emptySocialClasses: SocialClass[] = [];
    const result = service.calculateAverageHappinessOfSocialClasses(emptySocialClasses);
    assert.equal(result, 0);
  });
});
