import type { LicensedFileDTO } from '@shared/licensed-file/licensed-file-dto';

export interface ProductDto {
  id: number;
  name: string;
  description: string;
  licensedFile: LicensedFileDTO;
  price: number;
  costOfProduction: number;
}
