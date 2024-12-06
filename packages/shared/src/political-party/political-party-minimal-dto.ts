import type { PoliticalAffiliation } from '@shared/types/political-party/political-affiliation';
import type { LicensedFileDTO } from '@shared/types/licensed-file/licensed-file-dto';

export interface PoliticalPartyMinimalDto {
  id: number;
  name: string;
  affiliation: PoliticalAffiliation;
  licensedFile: LicensedFileDTO;
}
