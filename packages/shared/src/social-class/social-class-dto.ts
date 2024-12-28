import type { SocialClassTypes } from '@shared/social-class/social-class-types.js';
import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto.js';
import type { HappinessLevels } from '@shared/common/happiness-levels.js';
import type { ChartDataDTO } from '@shared/chart/ChartDataDTO.js';

export interface SocialClassDto {
  id: number;
  name: string;
  description: string;
  color: string;
  economicalSituation: string;
  happinessLevel: HappinessLevels;
  socialClassType: SocialClassTypes;
  licensedFiles: LicensedFileDTO[];
  economicalSituationPerMonthChartData: ChartDataDTO;
}
