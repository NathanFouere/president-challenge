import type { SectorTypes } from '@shared/sector/sector-types.js';
import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto.js';
import type { MinimalSocialClassDto } from '@shared/social-class/minimal-social-class-dto.js';
import type { ChartDataDTO } from '@shared/chart/ChartDataDTO.js';
import type { MinimalProductDto } from '@shared/product/minimal-product-dto.js';

export interface SectorDto {
  id: number;
  name: string;
  type: SectorTypes;
  description: string;
  licensedFile: LicensedFileDTO;
  socialClasses: MinimalSocialClassDto[];
  products: MinimalProductDto[];
  economicalSituationPerMonthChartData: ChartDataDTO;
}
