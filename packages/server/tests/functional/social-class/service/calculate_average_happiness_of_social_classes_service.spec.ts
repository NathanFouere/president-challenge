import { test } from '@japa/runner';
import { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
import { SocialClassSubtypes } from '@shared/dist/social-class/social-class-subtypes.js';
import type SocialClass from '#social-class/domain/models/social_class';
import { aSocialClass } from '#social-class/application/builders/social_class_builder';
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

  test('should calculate the average happiness of multiple social classes', async ({ assert }) => {
    const service = new CalculateAverageMarginOfSocialClassesService();

    const socialClassOneHappinessLevel = 3;
    const socialClass1 = aSocialClass()
      .withName('Prolétaires')
      .withDescription('Classe la plus modeste')
      .withColor('#FFFFFF')
      .withEconomicalSituation(10)
      .withSubtype(SocialClassSubtypes.IndustrialOwners)
      .withType(SocialClassTypes.CAPITALIST)
      .withGameId(1)
      .withSectorId(100)
      .build();

    const socialClassTwoHappinessLevel = 4;
    const socialClass2 = aSocialClass()
      .withName('Bourgeoisie')
      .withDescription('Classe aisée')
      .withColor('#000000')
      .withEconomicalSituation(100)
      .withSubtype(SocialClassSubtypes.IndustrialOwners)
      .withType(SocialClassTypes.CAPITALIST)
      .withGameId(1)
      .withSectorId(200)
      .build();

    const result = service.calculateAverageHappinessOfSocialClasses([socialClass1, socialClass2]);
    const expectedResult = (socialClassOneHappinessLevel + socialClassTwoHappinessLevel) / 2;

    assert.equal(result, expectedResult);
  });
});
