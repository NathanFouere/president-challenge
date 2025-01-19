import State from '#state/domain/model/state';
import type { GetStateOfGameQuery } from '#state/application/query/get_state_of_game_query';
import type IGetStateOfGameQueryHandler from '#state/application/query/i_get_state_of_game_query_handler';

export default class GetStateOfGameQueryHandler implements IGetStateOfGameQueryHandler {
  private async getStateOfGame(
    query: GetStateOfGameQuery,
    preloadOptions: { flag?: boolean; economicalSituationPerTurn?: boolean; budgets?: boolean } = {},
  ): Promise<State> {
    const queryBuilder = State.query().where('game_id', query.gameId);

    if (preloadOptions.flag) {
      queryBuilder.preload('flag');
    }

    if (preloadOptions.budgets) {
      queryBuilder.preload('budgets', (query) => {
        query.preload('licensedFile');
      });
    }

    if (preloadOptions.economicalSituationPerTurn) {
      queryBuilder.preload('economicalSituationPerTurn', (query) => {
        query.orderBy('turn', 'asc');
      });
    }

    return queryBuilder.firstOrFail();
  }

  public async handle(query: GetStateOfGameQuery): Promise<State> {
    return await this.getStateOfGame(query, {});
  }

  public async handleForDisplay(query: GetStateOfGameQuery): Promise<State> {
    return await this.getStateOfGame(query, {
      flag: true,
      economicalSituationPerTurn: true,
      budgets: true,
    });
  }
}
