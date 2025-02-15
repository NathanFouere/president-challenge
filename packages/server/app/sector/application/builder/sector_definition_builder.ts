import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import SectorDefinition from '#sector/domain/model/sector_definition';

export class SectorDefinitionBuilder {
  private name: string | null = null;
  private type: SectorTypes | null = null;
  private description: string | null = null;
  private licensedFileIdentifier: string | null = null;
  private defaultEconomicalSituation: number | null = null;
  private defaultOwnershipType: SectorOwnershipType | null = null;

  public withName(name: string): this {
    this.name = name;
    return this;
  }

  public withEconomicalSituation(economicalSituation: number): this {
    this.defaultEconomicalSituation = economicalSituation;
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

  public withOwnershipType(ownershipType: SectorOwnershipType): this {
    this.defaultOwnershipType = ownershipType;
    return this;
  }

  public build(): SectorDefinition {
    const sector = new SectorDefinition();

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

    if (this.defaultEconomicalSituation !== null) {
      sector.defaultEconomicalSituation = this.defaultEconomicalSituation;
    }
    else {
      throw new Error('economicalSituation is required');
    }

    if (this.defaultOwnershipType !== null) {
      sector.defaultOwnershipType = this.defaultOwnershipType;
    }
    else {
      throw new Error('ownershipType is required');
    }

    return sector;
  }
}

export function aSectorDefinition(): SectorDefinitionBuilder {
  return new SectorDefinitionBuilder();
}
