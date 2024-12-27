import type { PoliticalAffiliation } from '@shared/political-party/political-affiliation';
import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto';

export interface PoliticalPartyMinimalDto {
  id: number;
  name: string;
  affiliation: PoliticalAffiliation;
  licensedFile: LicensedFileDTO;
}
