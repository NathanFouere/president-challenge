import type { ChartDataDTO } from '@president-challenge/shared/chart/ChartDataDTO.js';

export interface ElectionResultsDto {
  chartData: ChartDataDTO;
  title: string;
  description: string;
}
