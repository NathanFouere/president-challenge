import type { HappinessLevels } from '@shared/common/happiness-levels.js';
import type { PoliticalAffiliation } from '@shared/political-party/political-affiliation.js';
import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto.js';
import type { ChartDataDTO } from '@shared/chart/ChartDataDTO.js';

export interface PoliticalPartyDTO {
  id: number;
  name: string;
  affiliation: PoliticalAffiliation;
  licensedFile: LicensedFileDTO;
  description: string;
  happinessLevel: HappinessLevels;
  happinessPerMonthChartData: ChartDataDTO;
}
