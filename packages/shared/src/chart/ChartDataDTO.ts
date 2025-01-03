import type { DatasetDTO } from '@shared/chart/DatasetDTO.js';

export interface ChartDataDTO {
  labels: string[];
  datasets: DatasetDTO[];
  title: string | null;
}
