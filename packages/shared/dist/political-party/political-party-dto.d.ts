import type { PoliticalAffiliation } from '@president-challenge/shared/political-party/political-affiliation.js';
import type { LicensedFileDTO } from '@president-challenge/shared/licensed-file/licensed-file-dto.js';
import type { LineChartDataDTO } from '@president-challenge/shared/chart/LineChartDataDTO.js';
import type HappinessModifierDto from '@president-challenge/shared/common/happiness-modifier-dto.js';
export interface PoliticalPartyDTO {
    id: number;
    name: string;
    affiliation: PoliticalAffiliation;
    licensedFile: LicensedFileDTO;
    description: string;
    happinessLevel: string;
    inPower: boolean;
    happinessPerMonthChartData: LineChartDataDTO;
    happinessModifiers: HappinessModifierDto[];
}
