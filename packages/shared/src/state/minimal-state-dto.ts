import type { LicensedFileDTO } from '@president-challenge/shared/licensed-file/licensed-file-dto.js';

export interface MinimalStateDto {
  name: string;
  description: string;
  economicalSituation: number;
  flag: LicensedFileDTO;
}
