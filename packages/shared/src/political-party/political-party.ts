import type { PoliticalAffiliation } from '@shared/types/political-party/political_affiliation';

export interface PoliticalParty {
  name: string;
  affiliation: PoliticalAffiliation;
}
