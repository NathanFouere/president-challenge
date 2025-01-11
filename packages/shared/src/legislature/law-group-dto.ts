import type { MinimalLawDto } from '@shared/legislature/minimal-law-dto.js';

export interface LawGroupDto {
  id: number;
  name: string;
  description: string;
  propertyLaws: MinimalLawDto[];
}
