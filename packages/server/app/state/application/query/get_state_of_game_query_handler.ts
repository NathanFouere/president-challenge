import State from '#state/domain/model/state';
import type { GetStateOfGameQuery } from '#state/application/query/get_state_of_game_query';

export class GetStateOfGameQueryHandler {
  public async handle(query: GetStateOfGameQuery): Promise<State> {
    return await State
      .query()
      .where('game_id', query.gameId)
      .preload('flag')
      .preload('economicalSituationPerTurn')
      .firstOrFail();
  }
}
