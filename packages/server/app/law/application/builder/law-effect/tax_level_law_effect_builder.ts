import LawEffectBuilder from '#law/application/builder/law-effect/law_effect_builder';
import type { TaxLevel } from '#tax/domain/model/tax_level';
import TaxLevelLawEffect from '#law/domain/model/law-effect/tax_level_law_effect';

export default class TaxLevelLawEffectBuilder extends LawEffectBuilder {
  private taxId: number | null = null;
  private level: TaxLevel | null = null;

  public withTaxId(taxId: number): this {
    this.taxId = taxId;
    return this;
  }

  public withLevel(level: TaxLevel): this {
    this.level = level;
    return this;
  }

  public build(): TaxLevelLawEffect {
    const taxLevelLawEffect = new TaxLevelLawEffect();
    if (this.gameId !== null) taxLevelLawEffect.gameId = this.gameId;
    else throw new Error('Game ID is required');
    if (this.lawId !== null) taxLevelLawEffect.lawId = this.lawId;
    else throw new Error('Law ID is required');
    if (this.taxId !== null) taxLevelLawEffect.taxId = this.taxId;
    else throw new Error('Tax ID is required');
    if (this.level !== null) taxLevelLawEffect.level = this.level;
    else throw new Error('Level is required');

    return taxLevelLawEffect;
  }

  public async exists(): Promise<TaxLevelLawEffect> {
    const taxLevelLawEffect = this.build();
    await taxLevelLawEffect.save();
    return taxLevelLawEffect;
  }
}

export function aTaxLevelLawEffect(): TaxLevelLawEffectBuilder {
  return new TaxLevelLawEffectBuilder();
}
