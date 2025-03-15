import type { LicensedFileDTO } from '@president-challenge/shared/licensed-file/licensed-file-dto.js';
export interface MinimalProductDto {
    id: number;
    name: string;
    description: string;
    licensedFile: LicensedFileDTO;
    price: number;
    costOfProduction: number;
}
