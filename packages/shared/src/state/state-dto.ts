import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto.js';
import type { LineChartDataDTO } from '@shared/chart/LineChartDataDTO.js';
import type { MinimalBudgetDto } from '@shared/state/minimal-budget-dto.js';
import type TaxDto from '@shared/tax/tax-dto.js';
import type { FinancialFlowDatas } from '@shared/state/financial_flow_datas.js';

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
