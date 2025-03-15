import type { LicensedFileDTO } from '@president-challenge/shared/licensed-file/licensed-file-dto.js';
import type { LineChartDataDTO } from '@president-challenge/shared/chart/LineChartDataDTO.js';
import type TaxDto from '@president-challenge/shared/tax/tax-dto.js';
import type { FinancialFlowDatas } from '@president-challenge/shared/state/financial_flow_datas.js';
import type { MinimalBudgetDto } from '@president-challenge/shared/state/minimal-budget-dto.js';
export interface StateDto {
    name: string;
    description: string;
    economicalSituation: string;
    flag: LicensedFileDTO;
    economicalSituationPerMonthChartData: LineChartDataDTO;
    financialFlowDatas: FinancialFlowDatas[];
    budgets: MinimalBudgetDto[];
    taxes: TaxDto[];
}
