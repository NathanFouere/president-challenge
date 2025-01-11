import type { LawType } from '@shared/legislature/law-type.js';

export interface MinimalLawDto {
  id: number;
  name: string;
  description: string;
  voted: boolean;
  type: LawType;
}
