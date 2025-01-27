import type { SocialClassDto } from '@shared/dist/social-class/social-class-dto.js';
import { inject } from '@adonisjs/core';
import type SocialClass from '#social-class/domain/models/social_class';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ChartDataFactory from '#common/utils/chart_data_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import RangeLevelMatch from '#common/utils/range_level_match';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import HappinessDtoFactory from '#happiness-modifier/application/dto-factory/happiness_dto_factory';

@inject()
export class SocialClassDtoFactory {
  constructor(
    private readonly licensedFileDTOFactory: LicensedFileDTOFactory,
    private readonly chartDataFactory: ChartDataFactory,
    private readonly rangeLevelMatch: RangeLevelMatch,
    private readonly happinessModifierDtoFactory: HappinessDtoFactory,
  ) {
  }

  readonly socialClassEconomicalSituationRangeLevels = [
    { min: 0, max: 15, value: 'Very-Low' },
    { min: 15, max: 40, value: 'Low' },
    { min: 40, max: 60, value: 'Medium' },
    { min: 60, max: 80, value: 'High' },
    { min: 80, max: 100, value: 'Very-High' },
  ];

  readonly socialClassHappinessRangeLevels = [
    { min: 0, max: 0, value: 'Very-Low' },
    { min: 1, max: 1, value: 'Low' },
    { min: 2, max: 2, value: 'Medium' },
    { min: 3, max: 3, value: 'High' },
    { min: 4, max: 4, value: 'Very-High' },
  ];

  public createFromSocialClass(socialClass: SocialClass): SocialClassDto {
    return {
      id: socialClass.id,
      name: socialClass.name,
      description: socialClass.description,
      color: socialClass.color,
      economicalSituation: this.rangeLevelMatch.createFromAmount(socialClass.economicalSituation, this.socialClassEconomicalSituationRangeLevels),
      happinessLevel: this.rangeLevelMatch.createFromAmount(socialClass.getHappinessLevel(), this.socialClassHappinessRangeLevels),
      socialClassType: socialClass.subType,
      licensedFiles: this.licensedFileDTOFactory.createFromLicensedFiles(socialClass.licensedFiles),
      happinessPerMonthChartData: this.chartDataFactory.createLineCartFromSaveAmountPerTurn(
        socialClass.happinessPerTurn,
        'Happiness Level',
        0,
        4,
        this.socialClassHappinessRangeLevels,
      ),
      economicalSituationPerMonthChartData: this.chartDataFactory.createLineCartFromSaveAmountPerTurn(
        socialClass.economicalSituationPerTurn,
        'Economical Situation',
        0,
        100,
        this.socialClassEconomicalSituationRangeLevels,
      ),
      happinessModifiers: this.happinessModifierDtoFactory.createFromHappinesssModifiers(socialClass.happinessModifiers),
    };
  }
}
