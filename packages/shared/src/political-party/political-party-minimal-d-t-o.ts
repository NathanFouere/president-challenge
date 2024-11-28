import type { PoliticalAffiliation } from '@shared/types/political-party/political_affiliation';

export interface PoliticalPartyMinimalDTO {
  id: number;
  name: string;
  affiliation: PoliticalAffiliation;
}
