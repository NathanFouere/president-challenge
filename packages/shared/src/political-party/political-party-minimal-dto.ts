import type { PoliticalAffiliation } from '@shared/political-party/political-affiliation.js';
import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto.js';

export interface PoliticalPartyMinimalDto {
  id: number;
  name: string;
  affiliation: PoliticalAffiliation;
  licensedFile: LicensedFileDTO;
}
