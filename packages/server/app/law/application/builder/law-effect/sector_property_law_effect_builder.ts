import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import LawEffectBuilder from '#law/application/builder/law-effect/law_effect_builder';
import SectorPropertyLawEffect from '#law/domain/model/law-effect/sector_property_law_effect';

export default class SectorPropertyLawEffectBuilder extends LawEffectBuilder {
  private sectorId: number | null = null;
  private ownershipType: SectorOwnershipType | null = null;

  public withSectorId(sectorId: number): this {
    this.sectorId = sectorId;
    return this;
  }

  public withOwnershipType(ownershipType: SectorOwnershipType): this {
    this.ownershipType = ownershipType;
    return this;
  }

  public build(): SectorPropertyLawEffect {
    const sectorPropertyLawEffect = new SectorPropertyLawEffect();
    if (this.gameId !== null) sectorPropertyLawEffect.gameId = this.gameId;
    else throw new Error('Game ID is required');
    if (this.lawId !== null) sectorPropertyLawEffect.lawId = this.lawId;
    else throw new Error('Law ID is required');
    if (this.sectorId !== null) sectorPropertyLawEffect.sectorId = this.sectorId;
    else throw new Error('Sector ID is required');
    if (this.ownershipType !== null) sectorPropertyLawEffect.ownershipType = this.ownershipType;
    else throw new Error('Ownership type is required');

    return sectorPropertyLawEffect;
  }

  public async exists(): Promise<SectorPropertyLawEffect> {
    const sectorPropertyLawEffect = this.build();
    await sectorPropertyLawEffect.save();
    return sectorPropertyLawEffect;
  }
}

export function aSectorPropertyLawEffect(): SectorPropertyLawEffectBuilder {
  return new SectorPropertyLawEffectBuilder();
}
