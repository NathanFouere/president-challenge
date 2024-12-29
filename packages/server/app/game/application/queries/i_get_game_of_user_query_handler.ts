import type { GetGameOfUserQuery } from '#game/application/queries/get_game_of_user_query';
import type Game from '#game/domain/models/game';

export default abstract class IGetGameOfUserQueryHandler {
  public abstract handle(query: GetGameOfUserQuery): Promise<Game>;
}
