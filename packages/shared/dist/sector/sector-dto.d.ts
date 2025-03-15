import type { SectorTypes } from '@president-challenge/shared/sector/sector-types.js';
import type { LicensedFileDTO } from '@president-challenge/shared/licensed-file/licensed-file-dto.js';
import type { MinimalSocialClassDto } from '@president-challenge/shared/social-class/minimal-social-class-dto.js';
import type { MinimalProductDto } from '@president-challenge/shared/product/minimal-product-dto.js';
import type { LineChartDataDTO } from '@president-challenge/shared/chart/LineChartDataDTO.js';
export interface SectorDto {
    id: number;
    name: string;
    type: SectorTypes;
    description: string;
    economicalSituation: string;
    licensedFile: LicensedFileDTO;
    socialClasses: MinimalSocialClassDto[];
    products: MinimalProductDto[];
    economicalSituationPerMonthChartData: LineChartDataDTO;
}
