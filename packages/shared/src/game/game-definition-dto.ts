import type { LicensedFileDTO } from '@president-challenge/shared/licensed-file/licensed-file-dto.js';

export interface GameDefinitionDto {
  identifier: string;
  name: string;
  description: string;
  logo: LicensedFileDTO;
  inDevelopment: boolean;
}
