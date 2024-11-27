import { inject } from '@adonisjs/core';

import type { HttpContext } from '@adonisjs/core/http';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  GetPoliticalPartiesOfGameQueryHandler,
} from '#political-party/application/queries/get_political_parties_of_game_query_handler';
import GetPoliticalPartiesOfGameQuery from '#political-party/application/queries/get_political_parties_of_game_query';

@inject()
export default class GetPoliticalPartiesOfGameController {
  constructor(
    private readonly getPoliticalPartiesOfGameQueryHandler: GetPoliticalPartiesOfGameQueryHandler,
  ) {}

  public async getPoliticalPartiesOfGame({ params }: HttpContext) {
    const gameId = params.gameId;

    return await this.getPoliticalPartiesOfGameQueryHandler.handle(new GetPoliticalPartiesOfGameQuery(gameId));
  }
}
