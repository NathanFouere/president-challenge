import type { LawDto } from '@shared/dist/legislature/law-dto.js';
import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import MinimalLawDtoFactory from '#legislature/application/dto-factories/minimal_law_dto_factory';
import type Law from '#legislature/domain/models/law';

@inject()
export default class LawDtoFactory {
  constructor(
    private readonly minimalLawDtoFactory: MinimalLawDtoFactory,
  ) {
  }

  public createFromLaw(law: Law): LawDto {
    return {
      ...this.minimalLawDtoFactory.createFromLaw(law),
    };
  }
}
