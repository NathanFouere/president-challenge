import type { LicensedFileDTO } from '@president-challenge/shared/licensed-file/licensed-file-dto.js';
import type { LineChartDataDTO } from '@president-challenge/shared/chart/LineChartDataDTO.js';
export interface ProductDto {
    id: number;
    name: string;
    description: string;
    licensedFile: LicensedFileDTO;
    price: number;
    costOfProduction: number;
    pricePerMonthChartData: LineChartDataDTO;
}
