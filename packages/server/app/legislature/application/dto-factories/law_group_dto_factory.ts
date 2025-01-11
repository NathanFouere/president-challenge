import { inject } from '@adonisjs/core';
import type { LawGroupDto } from '@shared/dist/legislature/law-group-dto.js';

import { LawType } from '@shared/dist/legislature/law-type.js';
import type LawGroup from '#legislature/domain/models/law_group';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import MinimalLawDtoFactory from '#legislature/application/dto-factories/minimal_law_dto_factory';

@inject()
export default class LawGroupDtoFactory {
  constructor(
    private readonly minimalLawDtoFactory: MinimalLawDtoFactory,
  ) {
  }

  public createFromLawGroups(lawGroups: LawGroup[]): LawGroupDto[] {
    return lawGroups.map(lawGroup => this.createFromLawGroup(lawGroup));
  }

  public createFromLawGroup(lawGroup: LawGroup): LawGroupDto {
    return {
      id: lawGroup.id,
      name: lawGroup.name,
      description: lawGroup.description,
      propertyLaws: this.minimalLawDtoFactory.createFromLaws(lawGroup.propertyLaws, LawType.PROPERTY),
    };
  }
}
