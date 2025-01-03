import type { SocialClassDto } from '@shared/dist/social-class/social-class-dto.js';
import { inject } from '@adonisjs/core';
import type SocialClass from '#social-class/domain/models/social_class';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ChartDataFactory from '#common/utils/chart_data_factory';

@inject()
export class SocialClassDtoFactory {
  constructor(
    private readonly licensedFileDTOFactory: LicensedFileDTOFactory,
    private readonly chartDataFactory: ChartDataFactory,
  ) {
  }

  public createFromSocialClass(socialClass: SocialClass): SocialClassDto {
    return {
      id: socialClass.id,
      name: socialClass.name,
      description: socialClass.description,
      color: socialClass.color,
      economicalSituation: 'todo',
      happinessLevel: socialClass.happinessLevel,
      socialClassType: socialClass.subType,
      licensedFiles: this.licensedFileDTOFactory.createFromLicensedFiles(socialClass.licensedFiles),
      happinessPerMonthChartData: this.chartDataFactory.createFromAmountPerTurn(
        socialClass.happinessPerTurn,
        'Happiness Level',
        0,
        4,
        [
          { min: 0, max: 0, value: 'Very-Low' },
          { min: 1, max: 1, value: 'Low' },
          { min: 2, max: 2, value: 'Medium' },
          { min: 3, max: 3, value: 'High' },
          { min: 4, max: 4, value: 'Very-High' },
        ],
      ),
      economicalSituationPerMonthChartData: this.chartDataFactory.createFromAmountPerTurn(
        socialClass.economicalSituationPerTurn,
        'Economical Situation',
        0,
        4,
        [
          { min: 0, max: 0, value: 'Very-Low' },
          { min: 1, max: 1, value: 'Low' },
          { min: 2, max: 2, value: 'Medium' },
          { min: 3, max: 3, value: 'High' },
          { min: 4, max: 4, value: 'Very-High' },
        ]),
    };
  }
}
