import { inject } from '@adonisjs/core';
import { aParliament } from '#legislature/application/builders/parliament_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IParliamentRepository from '#legislature/domain/repository/i_parliament_repository';

@inject()
export class ParliamentStartupService {
  constructor(
    private readonly parliamentRepository: IParliamentRepository,
  ) {
  }

  public async initialize(gameId: number): Promise<void> {
    const parliament = aParliament()
      .withGameId(gameId)
      .build();

    await this.parliamentRepository.save(parliament);
  }
}
