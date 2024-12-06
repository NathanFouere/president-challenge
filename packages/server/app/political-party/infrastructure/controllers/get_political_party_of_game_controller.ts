import { inject } from '@adonisjs/core';

import type { HttpContext } from '@adonisjs/core/http';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PoliticalPartyDTOFactory } from '#political-party/application/dto-factories/political_party_dto_factory';
import GetPoliticalPartiesOfGameQuery from '#political-party/application/queries/get_political_party_of_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  GetPoliticalPartyOfGameQueryHandler,
} from '#political-party/application/queries/get_political_party_of_game_query_handler';

@inject()
export default class GetPoliticalPartyController {
  constructor(
    private readonly getPoliticalPartyOfGameQueryHandler: GetPoliticalPartyOfGameQueryHandler,
    private readonly politicalPartyFactory: PoliticalPartyDTOFactory,
  ) {}

  public async getPoliticalPartyOfGame({ params }: HttpContext) {
    const politicalPartyId = params.politicalPartyId;
    const gameId = params.gameId;

    const politicalParty = await this.getPoliticalPartyOfGameQueryHandler.handle(new GetPoliticalPartiesOfGameQuery(gameId, politicalPartyId));
    return this.politicalPartyFactory.createPoliticalPartyDTO(politicalParty);
  }
}
