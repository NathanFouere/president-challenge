import type {
  VotePerAffiliationStartupInterface,
} from '#law/infrastructure/startup/startup-interface/vote_per_affiliation_startup_interface';
import type { LawType } from '#law/domain/model/law_type';

export interface LawStartupInterface {
  name: string;
  description: string;
  voted: boolean;
  order: number;
  politicalWeightRequired: number;
  type: LawType;
  effectIdentifier: string;
  votesPerAffiliation: VotePerAffiliationStartupInterface[];
}
