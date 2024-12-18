import type { SocialClassTypes } from '@shared/types/social-class/social-class-types';
import type { LicensedFileDTO } from '@shared/types/licensed-file/licensed-file-dto';
import type { WealthLevels } from '@shared/types/social-class/wealth-levels';

export interface MinimalSocialClassDto {
  id: number;
  name: string;
  description: string;
  color: string;
  wealthLevel: WealthLevels;
  socialClassType: SocialClassTypes;
  licensedFile: LicensedFileDTO;
}
