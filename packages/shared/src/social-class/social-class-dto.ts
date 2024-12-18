import type { SocialClassTypes } from '@shared/types/social-class/social-class-types';
import type { LicensedFileDTO } from '@shared/types/licensed-file/licensed-file-dto';
import type { WealthLevels } from '@shared/types/social-class/wealth-levels';
import type { HappinessLevels } from '@shared/types/common/happiness-levels';

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
