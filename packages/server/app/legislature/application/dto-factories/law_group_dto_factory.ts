import { inject } from '@adonisjs/core';
import type { LawGroupDto } from '@shared/dist/legislature/law-group-dto.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import MinimalPropertyLawDtoFactory from '#legislature/application/dto-factories/minimal_property_law_dto_factory';
import type LawGroup from '#legislature/domain/models/law_group';

@inject()
export default class LawGroupDtoFactory {
  constructor(
    private readonly propertyLawDtoFactory: MinimalPropertyLawDtoFactory,
  ) {
  }

  public createFromLawGroups(lawGroups: LawGroup[]): LawGroupDto[] {
    return lawGroups.map(lawGroup => this.createFromLawGroup(lawGroup));
  }

  public createFromLawGroup(lawGroup: LawGroup): LawGroupDto {
    return {
      id: lawGroup.id,
      name: lawGroup.name,
      type: lawGroup.type,
      description: lawGroup.description,
      propertyLaws: this.propertyLawDtoFactory.createFromPropertyLaws(lawGroup.propertyLaws),
    };
  }
}
