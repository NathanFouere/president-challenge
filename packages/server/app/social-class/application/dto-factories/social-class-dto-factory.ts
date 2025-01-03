import type { SocialClassDto } from '@shared/dist/social-class/social-class-dto.js';
import { inject } from '@adonisjs/core';
import type SocialClass from '#social-class/domain/models/social_class';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ChartDataFactory from '#common/utils/chart_data_factory';
import { socialClassHappinessRangeLevels } from '#social-class/domain/range-levels/social_class_happiness_range_levels';
import {
  socialClassEconomicalSituationRangeLevels,
} from '#social-class/domain/range-levels/social_class_economical_situation_range_levels';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import RangeLevelMatch from '#common/utils/range_level_match';

@inject()
export class SocialClassDtoFactory {
  constructor(
    private readonly licensedFileDTOFactory: LicensedFileDTOFactory,
    private readonly chartDataFactory: ChartDataFactory,
    private readonly rangeLevelMatch: RangeLevelMatch,
  ) {
  }

  public createFromSocialClass(socialClass: SocialClass): SocialClassDto {
    return {
      id: socialClass.id,
      name: socialClass.name,
      description: socialClass.description,
      color: socialClass.color,
      economicalSituation: this.rangeLevelMatch.createFromAmountPerTurn(socialClass.economicalSituation, socialClassEconomicalSituationRangeLevels),
      happinessLevel: this.rangeLevelMatch.createFromAmountPerTurn(socialClass.happinessLevel, socialClassHappinessRangeLevels),
      socialClassType: socialClass.subType,
      licensedFiles: this.licensedFileDTOFactory.createFromLicensedFiles(socialClass.licensedFiles),
      happinessPerMonthChartData: this.chartDataFactory.createFromAmountPerTurn(
        socialClass.happinessPerTurn,
        'Happiness Level',
        0,
        4,
        socialClassHappinessRangeLevels,
      ),
      economicalSituationPerMonthChartData: this.chartDataFactory.createFromAmountPerTurn(
        socialClass.economicalSituationPerTurn,
        'Economical Situation',
        0,
        4,
        socialClassEconomicalSituationRangeLevels),
    };
  }
}
