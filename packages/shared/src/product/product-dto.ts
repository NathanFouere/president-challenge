import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto.js';
import type { LineChartDataDTO } from '@shared/chart/LineChartDataDTO.js';

export interface ProductDto {
  id: number;
  name: string;
  description: string;
  licensedFile: LicensedFileDTO;
  price: number;
  costOfProduction: number;
  pricePerMonthChartData: LineChartDataDTO;
}
