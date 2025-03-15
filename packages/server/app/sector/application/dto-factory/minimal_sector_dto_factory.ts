import { inject } from '@adonisjs/core';
import type { MinimalSectorDto } from '@president-challenge/shared/dist/sector/minimal-sector-dto.js';
import type Sector from '#sector/domain/model/sector';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';

@inject()
export class MinimalSectorDtoFactory {
  constructor(
    private readonly licensedFileDTOFactory: LicensedFileDTOFactory,
  ) {
  }

  public createFromSector(sector: Sector): MinimalSectorDto {
    return {
      id: sector.id,
      name: sector.definition.name,
      type: sector.definition.type,
      description: sector.definition.description,
      licensedFile: this.licensedFileDTOFactory.createFromLicensedFile(sector.definition.licensedFile),
    };
  }

  public createFromSectors(sectors: Sector[]): MinimalSectorDto[] {
    return sectors.map(sector => this.createFromSector(sector));
  }
}
