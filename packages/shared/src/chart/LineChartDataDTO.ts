import type { YLabels } from '@shared/chart/YLabels.js';
import type { DatasetDTO } from '@shared/chart/DatasetDTO.js';

export interface LineChartDataDTO {
  labels: string[];
  datasets: DatasetDTO[];
  title: string | null;
  yLabels: YLabels | null;
  minY: number;
  maxY: number;
}
