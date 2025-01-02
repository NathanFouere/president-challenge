import type { SocialClassDto } from '@shared/dist/social-class/social-class-dto.js';
import { inject } from '@adonisjs/core';
import type SocialClass from '#social-class/domain/models/social_class';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
import { createChartDataFromAmountPerTurn } from '#common/utils';

@inject()
export class SocialClassDtoFactory {
  constructor(
    private readonly licensedFileDTOFactory: LicensedFileDTOFactory,
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
      happinessPerMonthChartData: createChartDataFromAmountPerTurn(socialClass.happinessPerTurn, 'Happiness Level'),
      economicalSituationPerMonthChartData: createChartDataFromAmountPerTurn(socialClass.economicalSituationPerTurn, 'Economical Situation'),
    };
  }
}
