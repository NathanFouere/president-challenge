import type { SectorTypes } from '@shared/types/sector/sector-types';
import type { LicensedFileDTO } from '@shared/types/licensed-file/licensed-file-dto';

export interface MinimalSectorDto {
  id: number;
  name: string;
  type: SectorTypes;
  description: string;
  licensedFile: LicensedFileDTO;
}
