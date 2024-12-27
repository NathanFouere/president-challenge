import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto';

export interface StateDto {
  name: string;
  description: string;
  economicalSituation: number;
  flag: LicensedFileDTO;
}
