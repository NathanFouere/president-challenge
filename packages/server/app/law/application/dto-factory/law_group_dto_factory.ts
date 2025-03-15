import { inject } from '@adonisjs/core';
import type { LawGroupDto } from '@president-challenge/shared/dist/legislature/law-group-dto.js';

import type LawGroup from '#law/domain/model/law_group';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import MinimalLawDtoFactory from '#law/application/dto-factory/minimal_law_dto_factory';

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
    const law = lawGroup.definitions.map((definition) => {
      if (definition.laws.length !== 1) {
        throw new Error(`Expected exactly one law per definition after game filtering, got ${definition.laws.length}`);
      }
      return definition.laws[0];
    });
    return {
      id: lawGroup.id,
      name: lawGroup.name,
      description: lawGroup.description,
      laws: this.minimalLawDtoFactory.createFromLaws(law),
    };
  }
}
