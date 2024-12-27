import type { SocialClassTypes } from '@shared/social-class/social-class-types.js';
import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto.js';
import type { WealthLevels } from '@shared/social-class/wealth-levels.js';
import type { HappinessLevels } from '@shared/common/happiness-levels.js';

export interface SocialClassDto {
  id: number;
  name: string;
  description: string;
  color: string;
  wealthLevel: WealthLevels;
  happinessLevel: HappinessLevels;
  socialClassType: SocialClassTypes;
  licensedFiles: LicensedFileDTO[];
}
