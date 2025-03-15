import type { LicensedFileDTO } from '@president-challenge/shared/licensed-file/licensed-file-dto.js';
import type { LineChartDataDTO } from '@president-challenge/shared/chart/LineChartDataDTO.js';
import type { LevelDto } from '@president-challenge/shared/common/level-dto.js';
import type { MinimalBudgetDto } from '@president-challenge/shared/state/minimal-budget-dto.js';
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
