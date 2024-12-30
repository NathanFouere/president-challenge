import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import Sector from '#sector/domain/model/sector';

export class SectorBuilder {
  private name: string | null = null;
  private type: SectorTypes | null = null;
  private description: string | null = null;
  private licensedFileIdentifier: string | null = null;
  private economicalSituation: number | null = null;
  private ownershipType: SectorOwnershipType | null = null;
  private gameId: number | null = null;

  public withName(name: string): this {
    this.name = name;
    return this;
  }

  public withEconomicalSituation(economicalSituation: number): this {
    this.economicalSituation = economicalSituation;
    return this;
  }

  public withType(type: SectorTypes): this {
    this.type = type;
    return this;
  }

  public withDescription(description: string): this {
    this.description = description;
    return this;
  }

  public withLicensedFileIdentifier(licensedFileIdentifier: string): this {
    this.licensedFileIdentifier = licensedFileIdentifier;
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

    if (this.name !== null) {
      sector.name = this.name;
    }
    else {
      throw new Error('name is required');
    }

    if (this.type !== null) {
      sector.type = this.type;
    }
    else {
      throw new Error('type is required');
    }

    if (this.description !== null) {
      sector.description = this.description;
    }
    else {
      throw new Error('description is required');
    }

    if (this.licensedFileIdentifier !== null) {
      sector.licensedFileIdentifier = this.licensedFileIdentifier;
    }
    else {
      throw new Error('licensedFileIdentifier is required');
    }

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

    return sector;
  }
}

export function aSector(): SectorBuilder {
  return new SectorBuilder();
}
