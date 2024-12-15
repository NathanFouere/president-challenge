import type { DatasetDTO } from './DatasetDTO';

export interface ChartDataDTO {
  labels: string[];
  datasets: DatasetDTO[];
  title: string | null;
}
