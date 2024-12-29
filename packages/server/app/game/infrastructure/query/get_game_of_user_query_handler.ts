import type { GetGameOfUserQuery } from '#game/application/queries/get_game_of_user_query';
import type Game from '#game/domain/models/game';
import type IGetGameOfUserQueryHandler from '#game/application/queries/i_get_game_of_user_query_handler';

export default class GetGameOfUserQueryHandler implements IGetGameOfUserQueryHandler {
  public async handle(query: GetGameOfUserQuery): Promise<Game> {
    return query.user.related('games').query().where('id', query.gameId).firstOrFail();
  }
}
