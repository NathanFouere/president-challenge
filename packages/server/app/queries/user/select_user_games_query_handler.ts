import type Game from '#models/game/game';
import type { SelectUserGamesQuery } from '#queries/user/select_user_games_query';

export default class SelectGamesQueryHandler {
  public async getUserGames(selectUserGamesQuery: SelectUserGamesQuery): Promise<Game[]> {
    return selectUserGamesQuery.user.related('games').query().orderBy('turn_number', 'desc');
  }
}
