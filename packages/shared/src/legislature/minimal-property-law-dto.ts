import type { LawDto } from '@shared/legislature/law-dto.js';

export interface MinimalPropertyLawDto extends LawDto {
  name: string;
  description: string;
  voted: boolean;
}
