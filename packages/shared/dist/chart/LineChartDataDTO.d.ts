import type { YLabels } from '@president-challenge/shared/chart/YLabels.js';
import type { DatasetDTO } from '@president-challenge/shared/chart/DatasetDTO.js';
export interface LineChartDataDTO {
    labels: string[];
    datasets: DatasetDTO[];
    title: string | null;
    yLabels: YLabels | null;
    minY: number | null;
    maxY: number | null;
}
