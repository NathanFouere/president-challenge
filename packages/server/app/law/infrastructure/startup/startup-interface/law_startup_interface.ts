import type {
  VotePerAffiliationStartupInterface,
} from '#law/infrastructure/startup/startup-interface/vote_per_affiliation_startup_interface';

export interface LawStartupInterface {
  name: string;
  description: string;
  voted: boolean;
  order: number;
  politicalWeightRequired: number;
  votesPerAffiliation: VotePerAffiliationStartupInterface[];
}
