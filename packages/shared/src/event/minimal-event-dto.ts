import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto';

export interface MinimalEventDto {
  id: number;
  identifier: string;
  title: string;
  text: string;
  isAvailable: boolean;
  beenRead: boolean;
  needsAction: boolean;
  licensedFile: LicensedFileDTO;
}
