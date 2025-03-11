import type { DatasetDTO } from '@president-challenge/shared/chart/DatasetDTO.js';

export interface ChartDataDTO {
  labels: string[];
  datasets: DatasetDTO[];
  title: string | null;
}
