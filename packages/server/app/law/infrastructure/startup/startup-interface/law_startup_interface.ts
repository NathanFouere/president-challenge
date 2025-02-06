import type {
  VotePerAffiliationStartupInterface,
} from '#law/infrastructure/startup/startup-interface/vote_per_affiliation_startup_interface';
import type { LawType } from '#law/domain/model/law_type';
import type {
  LawEffectStartupInterface,
} from '#law/infrastructure/startup/startup-interface/law-effect/law_effect_startup_interface';

export interface LawStartupInterface {
  name: string;
  description: string;
  voted: boolean;
  order: number;
  politicalWeightRequired: number;
  type: LawType;
  effect: LawEffectStartupInterface;
  votesPerAffiliation: VotePerAffiliationStartupInterface[];
}
