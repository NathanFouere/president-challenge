import type { SocialClassSubtypes } from '@shared/social-class/social-class-subtypes.js';
import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto.js';

export interface MinimalSocialClassDto {
  id: number;
  name: string;
  description: string;
  color: string;
  socialClassType: SocialClassSubtypes;
  licensedFile: LicensedFileDTO;
}
