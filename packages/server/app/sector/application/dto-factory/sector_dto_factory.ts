import type { SectorDto } from '@shared/dist/sector/sector-dto.js';
import { inject } from '@adonisjs/core';
import type { ChartDataDTO } from '@shared/dist/chart/ChartDataDTO.js';
import { getDateFromTurnNumber } from '@shared/dist/utils/date-converter.js';
import type Sector from '#sector/domain/model/sector';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MinimalSocialClassDtoFactory } from '#social-class/application/dto-factories/minimal-social-class-dto-factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MinimalProductDtoFactory } from '#product/application/factory/minimal_product_dto_factory';

@inject()
export class SectorDtoFactory {
  constructor(
    private readonly minimalSocialClassDtoFactory: MinimalSocialClassDtoFactory,
    private readonly licensedFileDTOFactory: LicensedFileDTOFactory,
    private readonly minimalProductDtoFactory: MinimalProductDtoFactory,
  ) {
  }

  public createFromSector(sector: Sector): SectorDto {
    return {
      id: sector.id,
      name: sector.name,
      type: sector.type,
      description: sector.description,
      licensedFile: this.licensedFileDTOFactory.createFromLicensedFile(sector.licensedFile),
      socialClasses: this.minimalSocialClassDtoFactory.createFromSocialClasses(sector.socialClasses),
      products: this.minimalProductDtoFactory.createFromProducts(sector.products),
      economicalSituationPerMonthChartData: this.createEconomicalSituationPerMonthChartData(sector),
    };
  }

  private createEconomicalSituationPerMonthChartData(sector: Sector): ChartDataDTO {
    const labels: string[] = [];
    const backgroundColor: string[] = [];
    const borderColor: string[] = [];
    const data: number[] = [];

    for (const monthEconomicalSituation of sector.economicalSituationPerTurn) {
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
