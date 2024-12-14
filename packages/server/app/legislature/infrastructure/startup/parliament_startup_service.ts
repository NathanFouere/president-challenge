import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ParliamentRepository } from '#legislature/infrastructure/repositories/parliament_repository';
import { aParliament } from '#legislature/application/builders/parliament_builder';
import type { Parliament } from '#legislature/domain/models/parliament';

@inject()
export class ParliamentStartupService {
  constructor(
    private readonly parliamentRepository: ParliamentRepository,
  ) {
  }

  public async initialize(gameId: number): Promise<Parliament> {
    const parliament = aParliament()
      .withGameId(gameId)
      .build();

    await this.parliamentRepository.save(parliament);

    return parliament;
  }
}
