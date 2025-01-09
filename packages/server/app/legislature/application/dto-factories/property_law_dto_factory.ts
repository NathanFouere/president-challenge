import type { PropertyLawDto } from '@shared/dist/legislature/property-law-dto.js';
import { inject } from '@adonisjs/core';
import type PropertyLaw from '#legislature/domain/models/property_law';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawDtoFactory from '#legislature/application/dto-factories/law_dto_factory';

@inject()
export default class PropertyLawDtoFactory {
  constructor(
    private readonly lawDtoFactory: LawDtoFactory,
  ) {
  }

  public createFromPropertyLaws(propertyLaws: PropertyLaw[]): PropertyLawDto[] {
    return propertyLaws.map(propertyLaw => this.createFromPropertyLaw(propertyLaw));
  }

  public createFromPropertyLaw(propertyLaw: PropertyLaw): PropertyLawDto {
    return {
      ...this.lawDtoFactory.createFromLaw(propertyLaw),
      sectorOwnershipTypeFrom: propertyLaw.sectorOwnershipTypeFrom,
      sectorOwnershipTypeTo: propertyLaw.sectorOwnershipTypeTo,
      sectorType: propertyLaw.sectorType,
    };
  }
}
