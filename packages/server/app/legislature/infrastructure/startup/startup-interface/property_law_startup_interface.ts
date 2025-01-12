import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import type {
  VotePerAffiliationStartupInterface,
} from '#legislature/infrastructure/startup/startup-interface/vote_per_affiliation_startup_interface';

export interface PropertyLawStartupInterface {
  name: string;
  description: string;
  voted: boolean;
  order: number;
  sectorType: SectorTypes;
  sectorOwnershipTypeTo: SectorOwnershipType;
  votesPerAffiliation: VotePerAffiliationStartupInterface[];
}
