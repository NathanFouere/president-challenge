import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import GetLawByGameQuery from '#law/application/query/get_law_by_game_and_type_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IGetLawByGameQueryHandler,
} from '#law/application/query/i_get_law_by_game_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import VoteLawService from '#law/application/service/vote_law_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGameRepository from '#game/domain/repository/i_game_repository';

@inject()
export default class VoteLawController {
  constructor(
    private readonly getLawByGameAndTypeQueryHandler: IGetLawByGameQueryHandler,
    private readonly gameRepository: IGameRepository,
    private readonly voteLawService: VoteLawService,
  ) {
  }

  public async voteLaw({ auth, params, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId: number = params.gameId;
      const lawId: number = params.lawId;

      const game = await this.gameRepository.getById(gameId);

      const law = await this.getLawByGameAndTypeQueryHandler.handleForVote(new GetLawByGameQuery(
        lawId,
        gameId,
      ));

      await this.voteLawService.voteLaw(law, game);
    }

    catch (e) {
      console.error(e);
      return response.internalServerError({
        message: 'Something went wrong',
        error: e,
      });
    }
  }
}
