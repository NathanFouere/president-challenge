import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import PropertyLaw from '#legislature/domain/models/property_law';
import { LawBuilder } from '#legislature/application/builders/law_builder';

export default class PropertyLawBuilder extends LawBuilder {
  private sectorType: SectorTypes | null = null;
  private sectorOwnershipTypeFrom: SectorOwnershipType | null = null;
  private sectorOwnershipTypeTo: SectorOwnershipType | null = null;

  public withSectorType(sectorType: SectorTypes): this {
    this.sectorType = sectorType;
    return this;
  }

  public withSectorOwnershipTypeFrom(sectorOwnershipTypeFrom: SectorOwnershipType): this {
    this.sectorOwnershipTypeFrom = sectorOwnershipTypeFrom;
    return this;
  }

  public withSectorOwnershipTypeTo(sectorOwnershipTypeTo: SectorOwnershipType): this {
    this.sectorOwnershipTypeTo = sectorOwnershipTypeTo;
    return this;
  }

  public build(): PropertyLaw {
    const propertyLaw = new PropertyLaw();
    if (this.name !== null) propertyLaw.name = this.name;
    else throw new Error('Name is required');
    if (this.description !== null) propertyLaw.description = this.description;
    else throw new Error('Description is required');
    if (this.lawGroupId !== null) propertyLaw.lawGroupId = this.lawGroupId;
    if (this.gameId) propertyLaw.gameId = this.gameId;
    else throw new Error('Game ID is required');
    if (this.voted !== null) propertyLaw.voted = this.voted;
    else throw new Error('Voted status is required');
    if (this.order !== null) propertyLaw.order = this.order;
    else throw new Error('Order is required');
    if (this.sectorType !== null) propertyLaw.sectorType = this.sectorType;
    else throw new Error('Sector type is required');
    if (this.sectorOwnershipTypeFrom !== null) propertyLaw.sectorOwnershipTypeFrom = this.sectorOwnershipTypeFrom;
    else throw new Error('Sector ownership type from is required');
    if (this.sectorOwnershipTypeTo !== null) propertyLaw.sectorOwnershipTypeTo = this.sectorOwnershipTypeTo;
    else throw new Error('Sector ownership type to is required');

    return propertyLaw;
  }
}

export function aPropertyLaw(): PropertyLawBuilder {
  return new PropertyLawBuilder();
}
