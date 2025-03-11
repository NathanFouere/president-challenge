import type { MinimalLawDto } from '@president-challenge/shared/legislature/minimal-law-dto.js';

export interface LawGroupDto {
  id: number;
  name: string;
  description: string;
  laws: MinimalLawDto[];
}
