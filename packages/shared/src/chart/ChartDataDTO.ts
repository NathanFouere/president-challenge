import type { DatasetDTO } from '@shared/chart/DatasetDTO.js';
import type { YLabels } from '@shared/chart/YLabels.js';

export interface ChartDataDTO {
  labels: string[];
  datasets: DatasetDTO[];
  yLabels: YLabels | null;
  minY: number;
  maxY: number;
  title: string | null;
}
