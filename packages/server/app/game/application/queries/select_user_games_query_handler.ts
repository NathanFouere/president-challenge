import type { SelectUserGamesQuery } from '#game/application/queries/select_user_games_query';
import type Game from '#game/domain/models/game';

export default class SelectGamesQueryHandler {
  public async getUserGames(selectUserGamesQuery: SelectUserGamesQuery): Promise<Game[]> {
    return selectUserGamesQuery.user.related('games').query().orderBy('turn', 'desc');
  }
}
