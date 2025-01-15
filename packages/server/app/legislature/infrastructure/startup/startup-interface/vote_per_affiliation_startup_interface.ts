import type { PoliticalAffiliation } from '@shared/dist/political-party/political-affiliation.js';

export interface VotePerAffiliationStartupInterface {
  affiliation: PoliticalAffiliation;
  percentageVoteFor: number;
}
