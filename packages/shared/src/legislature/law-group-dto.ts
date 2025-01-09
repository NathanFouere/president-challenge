import type { PropertyLawDto } from '@shared/legislature/property-law-dto.js';

export interface LawGroupDto {
  type: string;
  name: string;
  description: string;
  propertyLaws: PropertyLawDto[];
}
