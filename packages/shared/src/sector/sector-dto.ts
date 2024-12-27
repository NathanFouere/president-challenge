import type { SectorTypes } from '@shared/sector/sector-types';
import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto';
import type { ProductDto } from '@shared/product/product-dto';
import type { MinimalSocialClassDto } from '@shared/social-class/minimal-social-class-dto';

export interface SectorDto {
  id: number;
  name: string;
  type: SectorTypes;
  description: string;
  licensedFile: LicensedFileDTO;
  socialClasses: MinimalSocialClassDto[];
  products: ProductDto[];
}
