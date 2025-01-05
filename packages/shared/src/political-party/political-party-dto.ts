import type { PoliticalAffiliation } from '@shared/political-party/political-affiliation.js';
import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto.js';
import type { LineChartDataDTO } from '@shared/chart/LineChartDataDTO.js';
import type HappinessModifierDto from '@shared/common/happiness-modifier-dto.js';

export interface PoliticalPartyDTO {
  id: number;
  name: string;
  affiliation: PoliticalAffiliation;
  licensedFile: LicensedFileDTO;
  description: string;
  happinessLevel: string;
  happinessPerMonthChartData: LineChartDataDTO;
  happinessModifiers: HappinessModifierDto[];
}
