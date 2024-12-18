import { inject } from '@adonisjs/core';
import type { MinimalSectorDto } from '@shared/types/dist/types/sector/minimal-sector-dto.js';
import type Sector from '#sector/domain/model/sector';

@inject()
export class MinimalSectorDtoFactory {
  public createFromSector(sector: Sector): MinimalSectorDto {
    return {
      id: sector.id,
      type: sector.type,
      description: sector.description,
      licensedFile: this.licensedFileDTOFactory.createFromLicensedFile(sector.licensedFile),
    };
  }

  public createFromSectors(sectors: Sector[]): MinimalSectorDto[] {
    return sectors.map(sector => this.createFromSector(sector));
  }
}
