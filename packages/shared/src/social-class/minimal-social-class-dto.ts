import type { SocialClassTypes } from '@shared/social-class/social-class-types.js';
import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto.js';

export interface MinimalSocialClassDto {
  id: number;
  name: string;
  description: string;
  color: string;
  socialClassType: SocialClassTypes;
  licensedFile: LicensedFileDTO;
}
