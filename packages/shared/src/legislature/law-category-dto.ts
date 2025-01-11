import type { LawGroupDto } from '@shared/legislature/law-group-dto.js';

export interface LawCategoryDto {
  id: number;
  name: string;
  description: string;
  lawGroups: LawGroupDto[];
}
