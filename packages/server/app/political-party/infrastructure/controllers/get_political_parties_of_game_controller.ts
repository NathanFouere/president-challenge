import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  GetPoliticalPartiesOfGameQueryHandler,
} from '#political-party/application/queries/get_political_parties_of_game_query_handler';
import GetPoliticalPartiesOfGameQuery from '#political-party/application/queries/get_political_parties_of_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  PoliticalPartyMinimalDTOFactory,
} from '#political-party/application/dto-factories/political_party_minimal_dto_factory';

@inject()
export default class GetPoliticalPartiesOfGameController {
  constructor(
    private readonly getPoliticalPartiesOfGameQueryHandler: GetPoliticalPartiesOfGameQueryHandler,
    private readonly politicalPartyMinimalDTOFactory: PoliticalPartyMinimalDTOFactory,
  ) {}

  public async getPoliticalPartiesOfGame({ params }: HttpContext) {
    const gameId = params.gameId;

    const politicalParties = await this.getPoliticalPartiesOfGameQueryHandler.handle(new GetPoliticalPartiesOfGameQuery(gameId));

    return this.politicalPartyMinimalDTOFactory.createPoliticalPartyMinimalDTOList(politicalParties);
  }
}
