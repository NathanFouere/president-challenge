import type { SectorTypes } from '@shared/types/sector/sector-types';
import type { LicensedFileDTO } from '@shared/types/licensed-file/licensed-file-dto';
import type { SocialClassDto } from '@shared/types/social-class/social-class-dto';
import type { ProductDto } from '@shared/types/product/product-dto';
import type { MinimalSocialClassDto } from '@shared/types/social-class/minimal-social-class-dto';

export interface SectorDto {
  id: number;
  type: SectorTypes;
  description: string;
  licensedFile: LicensedFileDTO;
  socialClasses: MinimalSocialClassDto[];
  products: ProductDto[];
}
