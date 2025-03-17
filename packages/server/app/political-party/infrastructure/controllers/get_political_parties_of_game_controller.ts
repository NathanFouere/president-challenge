import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

import GetPoliticalPartiesOfGameQuery from '#political-party/application/queries/get_political_parties_of_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  PoliticalPartyMinimalDTOFactory,
} from '#political-party/application/dto-factories/political_party_minimal_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetPoliticalPartiesOfGameQueryHandler
  from '#political-party/application/queries/i_get_political_parties_of_game_query_handler';

@inject()
export default class GetPoliticalPartiesOfGameController {
  constructor(
    private readonly getPoliticalPartiesOfGameQueryHandler: IGetPoliticalPartiesOfGameQueryHandler,
    private readonly politicalPartyMinimalDTOFactory: PoliticalPartyMinimalDTOFactory,
  ) {}

  public async getPoliticalPartiesOfGame({ auth, response, params }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId = params.gameId;

      const politicalParties = await this.getPoliticalPartiesOfGameQueryHandler.handleForDisplay(new GetPoliticalPartiesOfGameQuery(gameId));

      return await this.politicalPartyMinimalDTOFactory.createPoliticalPartyMinimalDTOList(politicalParties);
    }
    catch (error) {
      console.error(error);
      return response.internalServerError({
        message: 'Something went wrong',
        error,
      });
    }
  }
}
