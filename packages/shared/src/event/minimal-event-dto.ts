import type { LicensedFileDTO } from '@shared/types/licensed-file/licensed-file-dto';

export interface MinimalEventDto {
  id: number; // TODO => voir si nécessaire
  identifier: string; // TODO => voir si nécessaire
  title: string;
  text: string;
  turn: number; // TODO => voir si nécessaire
  isAvailable: boolean;
  beenRead: boolean;
  licensedFiles: LicensedFileDTO[];
}
