import State from '#state/domain/model/state';
import type { GetStateOfGameQuery } from '#state/application/query/get_state_of_game_query';
import type IGetStateOfGameQueryHandler from '#state/application/query/i_get_state_of_game_query_handler';

export default class GetStateOfGameQueryHandler implements IGetStateOfGameQueryHandler {
  private async getState(query: GetStateOfGameQuery, preloadOptions: {
    display?: boolean;
    switchTurn?: boolean;
  } = {}): Promise<State> {
    const queryBuilder = State.query().where('game_id', query.gameId);

    if (preloadOptions.display) {
      queryBuilder.preload('budgets', (query) => {
        query.preload('licensedFile');
      });

      queryBuilder.preload('flag');

      queryBuilder.preload('economicalSituationPerTurn', (query) => {
        query.orderBy('turn', 'asc');
      });

      queryBuilder.preload('turnFinancialFlows', (query) => {
        query.preload('financialFlows');
        query.orderBy('turn', 'asc');
      });

      queryBuilder.preload('taxes');
    }

    if (preloadOptions.switchTurn) {
      queryBuilder.preload('budgets');
    }

    return queryBuilder.firstOrFail();
  }

  public async handle(query: GetStateOfGameQuery): Promise<State> {
    return await this.getState(query, { });
  }

  public async handleForDisplay(query: GetStateOfGameQuery): Promise<State> {
    return await this.getState(query, { display: true });
  }

  public async handleForSwitchTurn(query: GetStateOfGameQuery): Promise<State> {
    return await this.getState(query, { switchTurn: true });
  }
}
