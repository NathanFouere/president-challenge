import type { SectorTypes } from '@president-challenge/shared/sector/sector-types.js';
import type { LicensedFileDTO } from '@president-challenge/shared/licensed-file/licensed-file-dto.js';
export interface MinimalSectorDto {
    id: number;
    name: string;
    type: SectorTypes;
    description: string;
    licensedFile: LicensedFileDTO;
}
