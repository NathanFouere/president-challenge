import type { GetGameOfUserQuery } from '#game/application/queries/get_game_of_user_query';
import type Game from '#game/domain/models/game';

export class GetGameOfUserQueryHandler {
  public async handle(query: GetGameOfUserQuery): Promise<Game> {
    return query.user.related('games').query().where('id', query.gameId).firstOrFail();
  }
}
