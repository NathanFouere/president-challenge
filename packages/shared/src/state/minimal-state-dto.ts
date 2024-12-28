import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto.js';

export interface MinimalStateDto {
  name: string;
  description: string;
  economicalSituation: number;
  flag: LicensedFileDTO;
}
