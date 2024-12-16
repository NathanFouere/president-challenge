import type { SocialClassTypes } from '@shared/types/social-class/social-class-types';
import type { LicensedFileDTO } from '@shared/types/licensed-file/licensed-file-dto';

export interface MinimalSocialClassDto {
  id: number;
  name: string;
  description: string;
  color: string;
  wealthLevel: number;
  socialClassType: SocialClassTypes;
  licensedFile: LicensedFileDTO;
}
