import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import LawEffect from '#law/domain/model/law-effect/law_effect';
import type { LawEffectType } from '#law/domain/model/law-effect/law_effect_type';
import type { BudgetType } from '#state/domain/model/budget_type';
import type { BudgetLevel } from '#state/domain/model/budget_level';
import type { TaxType } from '#tax/domain/model/tax_type';
import type { TaxLevel } from '#tax/domain/model/tax_level';

export default class LawEffectBuilder {
  private identifier: string | null = null;
  private type: LawEffectType | null = null;
  private budgetTypeToChange: BudgetType | null = null;
  private budgetLevelToChange: BudgetLevel | null = null;
  private sectorTypeToChange: SectorTypes | null = null;
  private ownershipTypeToChange: SectorOwnershipType | null = null;
  private taxTypeToChange: TaxType | null = null;
  private taxLevelToChange: TaxLevel | null = null;

  public withIdentifier(identifier: string): this {
    this.identifier = identifier;
    return this;
  }

  public withType(type: LawEffectType): this {
    this.type = type;
    return this;
  }

  public withBudgetTypeToChange(budgetTypeToChange: BudgetType): this {
    this.budgetTypeToChange = budgetTypeToChange;
    return this;
  }

  public withBudgetLevelToChange(budgetLevelToChange: BudgetLevel): this {
    this.budgetLevelToChange = budgetLevelToChange;
    return this;
  }

  public withSectorTypeToChange(sectorTypeToChange: SectorTypes): this {
    this.sectorTypeToChange = sectorTypeToChange;
    return this;
  }

  public withSectorOwnershipTypeToChange(ownershipTypeToChange: SectorOwnershipType): this {
    this.ownershipTypeToChange = ownershipTypeToChange;
    return this;
  }

  public withTaxTypeToChange(taxTypeToChange: TaxType): this {
    this.taxTypeToChange = taxTypeToChange;
    return this;
  }

  public withTaxLevelToChange(taxLevelToChange: TaxLevel): this {
    this.taxLevelToChange = taxLevelToChange;
    return this;
  }

  public build(): LawEffect {
    const lawEffect = new LawEffect();
    if (this.identifier !== null) lawEffect.identifier = this.identifier;
    else throw new Error('Identifier is required');
    if (this.type !== null) lawEffect.type = this.type;
    else throw new Error('Type is required');
    if (this.budgetTypeToChange !== null) lawEffect.budgetTypeToChange = this.budgetTypeToChange;
    if (this.budgetLevelToChange !== null) lawEffect.budgetLevelToChange = this.budgetLevelToChange;
    if (this.sectorTypeToChange !== null) lawEffect.sectorTypeToChange = this.sectorTypeToChange;
    if (this.ownershipTypeToChange !== null) lawEffect.sectorOwnershipTypeToChange = this.ownershipTypeToChange;
    if (this.taxTypeToChange !== null) lawEffect.taxTypeToChange = this.taxTypeToChange;
    if (this.taxLevelToChange !== null) lawEffect.taxLevelToChange = this.taxLevelToChange;
    return lawEffect;
  }

  public async exists(): Promise<LawEffect> {
    const lawEffect = this.build();
    await lawEffect.save();
    return lawEffect;
  }
}

export function aLawEffect(): LawEffectBuilder {
  return new LawEffectBuilder();
}
