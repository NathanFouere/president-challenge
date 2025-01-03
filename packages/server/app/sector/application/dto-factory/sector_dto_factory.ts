import type { SectorDto } from '@shared/dist/sector/sector-dto.js';
import { inject } from '@adonisjs/core';
import type Sector from '#sector/domain/model/sector';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MinimalSocialClassDtoFactory } from '#social-class/application/dto-factories/minimal-social-class-dto-factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MinimalProductDtoFactory } from '#product/application/factory/minimal_product_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ChartDataFactory from '#common/utils/chart_data_factory';

@inject()
export class SectorDtoFactory {
  constructor(
    private readonly minimalSocialClassDtoFactory: MinimalSocialClassDtoFactory,
    private readonly licensedFileDTOFactory: LicensedFileDTOFactory,
    private readonly minimalProductDtoFactory: MinimalProductDtoFactory,
    private readonly chartDataFactory: ChartDataFactory,
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
      economicalSituationPerMonthChartData: this.chartDataFactory.createFromAmountPerTurn(
        sector.economicalSituationPerTurn,
        'Economical Situation',
        0,
        4,
        [
          {
            min: 0,
            max: 0,
            value: 'Very-Low',
          },
          {
            min: 1,
            max: 1,
            value: 'Low',
          },
          {
            min: 2,
            max: 2,
            value: 'Medium',
          },
          {
            min: 3,
            max: 3,
            value: 'High',
          },
          {
            min: 4,
            max: 4,
            value: 'Very-High',
          },
        ]),
    };
  }
}
