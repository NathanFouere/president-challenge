import type { ChartDataDTO } from '@shared/chart/ChartDataDTO.js';

export interface ElectionResultsDto {
  chartData: ChartDataDTO;
  title: string;
  description: string;
}
