import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';

export interface PropertyLawStartupInterface {
  name: string;
  description: string;
  voted: boolean;
  order: number;
  sectorType: SectorTypes;
  sectorOwnershipTypeTo: SectorOwnershipType;
}
