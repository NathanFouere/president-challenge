import type { SocialClassTypes } from '@shared/social-class/social-class-types';
import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto';
import type { WealthLevels } from '@shared/social-class/wealth-levels';
import type { HappinessLevels } from '@shared/common/happiness-levels';

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
