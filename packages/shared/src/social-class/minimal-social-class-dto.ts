import type { SocialClassTypes } from '@shared/social-class/social-class-types';
import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto';
import type { WealthLevels } from '@shared/social-class/wealth-levels';

export interface MinimalSocialClassDto {
  id: number;
  name: string;
  description: string;
  color: string;
  wealthLevel: WealthLevels;
  socialClassType: SocialClassTypes;
  licensedFile: LicensedFileDTO;
}
