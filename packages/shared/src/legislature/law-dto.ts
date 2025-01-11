import type { MinimalLawDto } from '@shared/legislature/minimal-law-dto.js';
import type { LawType } from '@shared/legislature/law-type.js';

export interface LawDto extends MinimalLawDto {
  id: number;
  name: string;
  description: string;
  voted: boolean;
  type: LawType;
}
