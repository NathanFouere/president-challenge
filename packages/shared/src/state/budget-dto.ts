import type { MinimalBudgetDto } from '@shared/state/minimal-budget-dto.js';
import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto.js';
import type { LineChartDataDTO } from '@shared/chart/LineChartDataDTO.js';
import type { LevelDto } from '@shared/common/level-dto.js';

export interface BudgetDto extends MinimalBudgetDto {
  id: number;
  name: string;
  color: string;
  description: string;
  level: LevelDto;
  cost: number;
  licensedFile: LicensedFileDTO;
  costPerMonthChartData: LineChartDataDTO;
}
