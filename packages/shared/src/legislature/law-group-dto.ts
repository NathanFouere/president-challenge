import type { MinimalPropertyLawDto } from '@shared/legislature/minimal-property-law-dto.js';

export interface LawGroupDto {
  id: number;
  type: string;
  name: string;
  description: string;
  propertyLaws: MinimalPropertyLawDto[];
}
