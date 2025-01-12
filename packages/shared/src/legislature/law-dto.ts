import type { MinimalLawDto } from '@shared/legislature/minimal-law-dto.js';

export interface LawDto extends MinimalLawDto {
  id: number;
  name: string;
  description: string;
  voted: boolean;
}
