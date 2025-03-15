import type { LicensedFileDTO } from '@president-challenge/shared/licensed-file/licensed-file-dto.js';
import type { LevelDto } from '@president-challenge/shared/common/level-dto.js';

export interface MinimalBudgetDto {
  id: number;
  name: string;
  color: string;
  description: string;
  level: LevelDto;
  cost: number;
  licensedFile: LicensedFileDTO;
}
