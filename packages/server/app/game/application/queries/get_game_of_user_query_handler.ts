import type { GetGameOfPlayerQuery } from '#game/application/queries/get_game_of_user_query';
import type Game from '#game/domain/models/game';

export class GetGameOfPlayerQueryHandler {
  public async handle(query: GetGameOfPlayerQuery): Promise<Game> {
    return query.user.related('games').query().where('id', query.gameId).firstOrFail();
  }
}
