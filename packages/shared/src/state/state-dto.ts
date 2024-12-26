import type { LicensedFileDTO } from '@shared/types/licensed-file/licensed-file-dto';

export interface StateDto {
  name: string;
  description: string;
  economicalSituation: number;
  flag: LicensedFileDTO;
}
