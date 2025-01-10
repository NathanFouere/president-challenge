import { inject } from '@adonisjs/core';
import type { MinimalPropertyLawDto } from '@shared/dist/legislature/minimal-property-law-dto.js';
import type PropertyLaw from '#legislature/domain/models/property_law';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawDtoFactory from '#legislature/application/dto-factories/law_dto_factory';

@inject()
export default class MinimalPropertyLawDtoFactory {
  constructor(
    private readonly lawDtoFactory: LawDtoFactory,
  ) {
  }

  public createFromPropertyLaws(propertyLaws: PropertyLaw[]): MinimalPropertyLawDto[] {
    return propertyLaws.map(propertyLaw => this.createFromPropertyLaw(propertyLaw));
  }

  public createFromPropertyLaw(propertyLaw: PropertyLaw): MinimalPropertyLawDto {
    return {
      ...this.lawDtoFactory.createFromLaw(propertyLaw),
    };
  }
}
