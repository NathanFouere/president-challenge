import type { ChartDataDTO } from '@president-challenge/shared/chart/ChartDataDTO.js';
export interface FinancialFlowDatas {
    turn: number;
    positiveFinancialFlows: ChartDataDTO;
    negativeFinancialFlows: ChartDataDTO;
}
