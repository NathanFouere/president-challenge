import type { SocialClassSubtypes } from '@shared/social-class/social-class-subtypes.js';
import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto.js';
import type { LineChartDataDTO } from '@shared/chart/LineChartDataDTO.js';
import type HappinessModifierDto from '@shared/common/happiness-modifier-dto.js';

export interface SocialClassDto {
  id: number;
  name: string;
  description: string;
  color: string;
  economicalSituation: string;
  happinessLevel: string;
  socialClassType: SocialClassSubtypes;
  licensedFiles: LicensedFileDTO[];
  economicalSituationPerMonthChartData: LineChartDataDTO;
  happinessPerMonthChartData: LineChartDataDTO;
  happinessModifiers: HappinessModifierDto[];
}
