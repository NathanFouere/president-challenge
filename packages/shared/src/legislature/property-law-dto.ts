import type { LawDto } from '@shared/legislature/law-dto.js';

export interface PropertyLawDto extends LawDto {
  name: string;
  description: string;
  voted: boolean;
  order: number;
  sectorType: string;
  sectorOwnershipTypeFrom: string;
  sectorOwnershipTypeTo: string;
}
