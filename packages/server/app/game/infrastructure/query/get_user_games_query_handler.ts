import type { GetUserGamesQuery } from '#game/application/queries/get_user_games_query';
import type Game from '#game/domain/models/game';
import type IGetUserGamesQueryHandler from '#game/application/queries/i_get_user_games_query_handler';

export default class GetUserGamesQueryHandler implements IGetUserGamesQueryHandler {
  public async getUserGames(getUserGamesQuery: GetUserGamesQuery): Promise<Game[]> {
    return getUserGamesQuery.user.related('games').query().orderBy('turn', 'desc');
  }
}
