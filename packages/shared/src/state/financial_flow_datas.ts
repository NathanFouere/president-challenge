import type { ChartDataDTO } from '@shared/chart/ChartDataDTO.js';

export interface FinancialFlowDatas {
  turn: number;
  positiveFinancialFlows: ChartDataDTO;
  negativeFinancialFlows: ChartDataDTO;
}
