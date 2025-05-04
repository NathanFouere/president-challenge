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
    const laws = [];
    for (const lawDefinition of lawGroup.lawDefinitions) {
      for (const law of lawDefinition.laws) {
        laws.push(law);
      }
    }
    return {
      id: lawGroup.id,
      name: lawGroup.name,
      description: lawGroup.description,
      laws: this.minimalLawDtoFactory.createFromLaws(laws),
    };
  }
}
