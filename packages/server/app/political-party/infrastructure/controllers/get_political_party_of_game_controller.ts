import { inject } from '@adonisjs/core';

import type { HttpContext } from '@adonisjs/core/http';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PoliticalPartyRepository } from '#political-party/infrastructure/repositories/political_party_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PoliticalPartyDTOFactory } from '#political-party/application/dto-factories/political_party_dto_factory';

@inject()
export default class GetPoliticalPartyController {
  constructor(
    private readonly politicalPartyRepository: PoliticalPartyRepository,
    private readonly politicalPartyFactory: PoliticalPartyDTOFactory,
  ) {}

  public async getPoliticalPartyOfGame({ params }: HttpContext) {
    const politicalPartyId = params.politicalPartyId;
    const gameId = params.gameId;

    const politicalParty = await this.politicalPartyRepository.getPoliticalPartyOfGameIdById(politicalPartyId, gameId);
    return this.politicalPartyFactory.createPoliticalPartyDTO(politicalParty);
  }
}
