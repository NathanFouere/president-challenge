import type { SocialClassTypes } from '@shared/social-class/social-class-types.js';
import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto.js';
import type { WealthLevels } from '@shared/social-class/wealth-levels.js';

export interface MinimalSocialClassDto {
  id: number;
  name: string;
  description: string;
  color: string;
  wealthLevel: WealthLevels;
  socialClassType: SocialClassTypes;
  licensedFile: LicensedFileDTO;
}
