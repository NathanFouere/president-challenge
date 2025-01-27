import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto.js';
import type { LevelDto } from '@shared/common/level-dto.js';

export interface MinimalBudgetDto {
  id: number;
  name: string;
  color: string;
  description: string;
  level: LevelDto;
  cost: number;
  licensedFile: LicensedFileDTO;
}
