import type { SocialClassTypes } from '@shared/types/social-class/social-class-types';
import type { LicensedFileDTO } from '@shared/types/licensed-file/licensed-file-dto';

export interface SocialClassDto {
  id: number;
  name: string;
  description: string;
  color: string;
  wealthLevel: string;
  happinessLevel: string;
  socialClassType: SocialClassTypes;
  licensedFiles: LicensedFileDTO[];
}
