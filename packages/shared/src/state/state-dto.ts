import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto.js';
import type { LineChartDataDTO } from '@shared/chart/LineChartDataDTO.js';
import type { MinimalBudgetDto } from '@shared/state/minimal-budget-dto.js';

export interface StateDto {
  name: string;
  description: string;
  economicalSituation: string;
  flag: LicensedFileDTO;
  economicalSituationPerMonthChartData: LineChartDataDTO;
  budgets: MinimalBudgetDto[];
}
