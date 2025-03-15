import type { PoliticalAffiliation } from '@president-challenge/shared/political-party/political-affiliation.js';
import type { LicensedFileDTO } from '@president-challenge/shared/licensed-file/licensed-file-dto.js';
export interface PoliticalPartyMinimalDto {
    id: number;
    name: string;
    affiliation: PoliticalAffiliation;
    licensedFile: LicensedFileDTO;
    inPower: boolean;
}
