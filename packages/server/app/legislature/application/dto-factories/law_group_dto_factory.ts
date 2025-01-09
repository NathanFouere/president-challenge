import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LawGroupDto } from '@shared/dist/legislature/law-group-dto.js';
import type PropertyLawDtoFactory from '#legislature/application/dto-factories/property_law_dto_factory';
import type LawGroup from '#legislature/domain/models/law_group';

@inject()
export default class LawGroupDtoFactory {
  constructor(
    private readonly propertyLawDtoFactory: PropertyLawDtoFactory,
  ) {
  }

  public createFromLawGroups(lawGroups: LawGroup[]): LawGroupDto[] {
    return lawGroups.map(lawGroup => this.createFromLawGroup(lawGroup));
  }

  public createFromLawGroup(lawGroup: LawGroup): LawGroupDto {
    return {
      name: lawGroup.name,
      type: lawGroup.type,
      description: lawGroup.description,
      propertyLaws: this.propertyLawDtoFactory.createFromPropertyLaws(lawGroup.propertyLaws),
    };
  }
}
