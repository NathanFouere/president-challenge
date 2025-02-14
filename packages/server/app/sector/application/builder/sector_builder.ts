import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import Sector from '#sector/domain/model/sector';

export class SectorBuilder {
  private economicalSituation: number | null = null;
  private ownershipType: SectorOwnershipType | null = null;
  private gameId: number | null = null;
  private definitionId: number | null = null;

  public withDefinitionId(definitionId: number): this {
    this.definitionId = definitionId;
    return this;
  }

  public withEconomicalSituation(economicalSituation: number): this {
    this.economicalSituation = economicalSituation;
    return this;
  }

  public withGameId(gameId: number): this {
    this.gameId = gameId;
    return this;
  }

  public withOwnershipType(ownershipType: SectorOwnershipType): this {
    this.ownershipType = ownershipType;
    return this;
  }

  public build(): Sector {
    const sector = new Sector();
    if (this.gameId !== null) {
      sector.gameId = this.gameId;
    }
    else {
      throw new Error('gameId is required');
    }

    if (this.economicalSituation !== null) {
      sector.economicalSituation = this.economicalSituation;
    }
    else {
      throw new Error('economicalSituation is required');
    }

    if (this.ownershipType !== null) {
      sector.ownershipType = this.ownershipType;
    }
    else {
      throw new Error('ownershipType is required');
    }

    if (this.definitionId !== null) {
      sector.definitionId = this.definitionId;
    }
    else {
      throw new Error('definitionId is required');
    }

    return sector;
  }
}

export function aSector(): SectorBuilder {
  return new SectorBuilder();
}
