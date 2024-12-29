import type { GetUserGamesQuery } from '#game/application/queries/get_user_games_query';
import type Game from '#game/domain/models/game';

export default abstract class IGetUserGamesQueryHandler {
  public abstract getUserGames(getUserGamesQuery: GetUserGamesQuery): Promise<Game[]>;
}
