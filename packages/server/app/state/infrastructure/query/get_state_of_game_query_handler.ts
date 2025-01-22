import State from '#state/domain/model/state';
import type { GetStateOfGameQuery } from '#state/application/query/get_state_of_game_query';
import type IGetStateOfGameQueryHandler from '#state/application/query/i_get_state_of_game_query_handler';

export default class GetStateOfGameQueryHandler implements IGetStateOfGameQueryHandler {
  public async handle(query: GetStateOfGameQuery): Promise<State> {
    return await State.query().where('game_id', query.gameId).firstOrFail();
  }

  public async handleForDisplay(query: GetStateOfGameQuery): Promise<State> {
    return await State.query().where('game_id', query.gameId)
      .preload('budgets', (query) => {
        query.preload('licensedFile');
      })
      .preload('flag').preload('economicalSituationPerTurn', (query) => {
        query.orderBy('turn', 'asc');
      }).firstOrFail();
  }

  public async handleForSwitchTurn(query: GetStateOfGameQuery): Promise<State> {
    return await State.query().where('game_id', query.gameId)
      .preload('budgets').firstOrFail();
  }
}
