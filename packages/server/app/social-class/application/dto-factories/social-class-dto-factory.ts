import type { SocialClassDto } from '@shared/dist/social-class/social-class-dto.js';
import { inject } from '@adonisjs/core';
import type { ChartDataDTO } from '@shared/dist/chart/ChartDataDTO.js';
import { getDateFromTurnNumber } from '@shared/dist/utils/date-converter.js';
import type SocialClass from '#social-class/domain/models/social_class';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';

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
      economicalSituationPerMonthChartData: this.createEconomicalSituationChartData(socialClass),
    };
  }

  private createEconomicalSituationChartData(socialClass: SocialClass): ChartDataDTO {
    const labels: string[] = [];
    const backgroundColor: string[] = [];
    const borderColor: string[] = [];
    const data: number[] = [];

    for (const monthEconomicalSituation of socialClass.economicalSituationPerTurn) {
      data.push(monthEconomicalSituation.amount);
      backgroundColor.push(monthEconomicalSituation.color);
      borderColor.push(monthEconomicalSituation.color);
      labels.push(getDateFromTurnNumber(monthEconomicalSituation.turn));
    }

    return {
      title: 'Economical Situation',
      labels,
      datasets: [
        {
          label: 'Economical Situation',
          data,
          backgroundColor,
          borderColor,
        },
      ],
    };
  }
}
