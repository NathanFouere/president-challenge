import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import GetLawByGameAndTypeQuery from '#legislature/application/query/get_law_by_game_and_type_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IGetLawByGameAndTypeQueryHandler,
} from '#legislature/application/query/i_get_law_by_game_and_type_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import VoteLawService from '#legislature/application/service/vote_law_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGameRepository from '#game/domain/repository/i_game_repository';

@inject()
export default class VoteLawController {
  constructor(
    private readonly getLawByGameAndTypeQueryHandler: IGetLawByGameAndTypeQueryHandler,
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

      const law = await this.getLawByGameAndTypeQueryHandler.handleForVote(new GetLawByGameAndTypeQuery(
        lawId,
        gameId,
      ));

      await this.voteLawService.voteLaw(law, game.turn);
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
