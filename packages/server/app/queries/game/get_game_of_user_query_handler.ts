import type { GetGameOfPlayerQuery } from '#queries/game/get_game_of_user_query';
import type Game from '#models/game/game';

export class GetGameOfPlayerQueryHandler {
  public async handle(query: GetGameOfPlayerQuery): Promise<Game> {
    return query.user.related('games').query().where('id', query.gameId).firstOrFail();
  }
}
