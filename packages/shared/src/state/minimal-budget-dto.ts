import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto.js';

export interface MinimalBudgetDto {
  id: number;
  name: string;
  color: string;
  description: string;
  level: LevelDto;
  cost: number;
  licensedFile: LicensedFileDTO;
}

export interface LevelDto {
  name: string;
  color: string;
}
