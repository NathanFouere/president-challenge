import type { SocialClassSubtypes } from '@president-challenge/shared/social-class/social-class-subtypes.js';
import type { LicensedFileDTO } from '@president-challenge/shared/licensed-file/licensed-file-dto.js';
import type { LineChartDataDTO } from '@president-challenge/shared/chart/LineChartDataDTO.js';
import type HappinessModifierDto from '@president-challenge/shared/common/happiness-modifier-dto.js';
import type { FinancialFlowDatas } from '@president-challenge/shared/state/financial_flow_datas.js';
export interface SocialClassDto {
    id: number;
    name: string;
    description: string;
    color: string;
    economicalSituation: string;
    happinessLevel: string;
    population: number;
    socialClassType: SocialClassSubtypes;
    licensedFiles: LicensedFileDTO[];
    economicalSituationPerMonthChartData: LineChartDataDTO;
    happinessPerMonthChartData: LineChartDataDTO;
    happinessModifiers: HappinessModifierDto[];
    financialFlowDatas: FinancialFlowDatas[];
}
