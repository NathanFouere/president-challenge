import type { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
import type { HappinessModifierType } from '@shared/dist/common/happiness-modifier-type.js';
import type { PoliticalAffiliation } from '@shared/dist/political-party/political-affiliation.js';
import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import type {
  VotePerAffiliationStartupInterface,
} from '#law/infrastructure/startup/startup-interface/vote_per_affiliation_startup_interface';
import type { LawType } from '#law/domain/model/law_type';
import type { TaxType } from '#tax/domain/model/tax_type';
import type { TaxLevel } from '#tax/domain/model/tax_level';
import type { BudgetType } from '#state/domain/model/budget_type';
import type { BudgetLevel } from '#state/domain/model/budget_level';

export interface LawStartupInterface {
  name: string;
  description: string;
  voted: boolean;
  order: number;
  politicalWeightRequired: number;
  type: LawType;
  votesPerAffiliation: VotePerAffiliationStartupInterface[];
  taxEffects: TaxEffectsInterface | null;
  budgetEffects: BudgetEffectInterface | null;
  sectorPropertyEffects: SectorPropertyEffects | null;
  socialClassHappinessEffects: SocialClassHappinessEffectInterface[];
  politicalAffiliationsHappinessEffects: PoliticalAffiliationHappinessEffectInterface[];
}

export interface TaxEffectsInterface {
  taxType: TaxType;
  taxLevel: TaxLevel;
}

export interface BudgetEffectInterface {
  budgetType: BudgetType;
  budgetLevel: BudgetLevel;
}

export interface SectorPropertyEffects {
  sectorType: SectorTypes;
  ownerShipType: SectorOwnershipType;
}

export interface SocialClassHappinessEffectInterface {
  socialClassType: SocialClassTypes;
  modifier: number;
  duration: number | null;
  type: HappinessModifierType;
}

export interface PoliticalAffiliationHappinessEffectInterface {
  politicalAffiliation: PoliticalAffiliation;
  modifier: number;
  duration: number | null;
  type: HappinessModifierType;
}
