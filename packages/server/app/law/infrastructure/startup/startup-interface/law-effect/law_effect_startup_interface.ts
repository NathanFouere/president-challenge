import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import type { BudgetLevel } from '#state/domain/model/budget_level';
import type { BudgetType } from '#state/domain/model/budget_type';
import type { TaxType } from '#tax/domain/model/tax_type';
import type { TaxLevel } from '#tax/domain/model/tax_level';

export type LawEffectStartupInterface = object;

export interface BudgetLevelLawEffectStartupInterface extends LawEffectStartupInterface {
  budgetType: BudgetType;
  level: BudgetLevel;
}

export interface TaxLevelLawEffectStartupInterface extends LawEffectStartupInterface {
  taxType: TaxType;
  level: TaxLevel;
}

export interface SectorPropertyLawEffectStartupInterface extends LawEffectStartupInterface {
  sectorType: SectorTypes;
  ownershipType: SectorOwnershipType;
}
