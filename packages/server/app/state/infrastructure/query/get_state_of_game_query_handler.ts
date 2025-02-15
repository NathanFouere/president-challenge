import State from '#state/domain/model/state';
import type { GetStateOfGameQuery } from '#state/application/query/get_state_of_game_query';
import type IGetStateOfGameQueryHandler from '#state/application/query/i_get_state_of_game_query_handler';

export default class GetStateOfGameQueryHandler implements IGetStateOfGameQueryHandler {
  private async getState(query: GetStateOfGameQuery, preloadOptions: {
    display?: boolean;
    switchTurn?: boolean;
  } = {}): Promise<State> {
    const queryBuilder = State.query().where('game_id', query.gameId);

    queryBuilder.preload('definition', (definitionQuery) => {
      if (preloadOptions.display) {
        definitionQuery.preload('flag');
      }
    });

    if (preloadOptions.display) {
      queryBuilder.preload('budgets', (budgetsQuery) => {
        budgetsQuery.preload('definition', (definitionQuery) => {
          definitionQuery.preload('licensedFile');
        });
      });

      queryBuilder.preload('economicalSituationPerTurn', (query) => {
        query.orderBy('turn', 'asc');
      });

      queryBuilder.preload('financialFlows', (query) => {
        query.orderBy('turn', 'asc');
      });

      queryBuilder.preload('taxes', (taxesQuery) => {
        taxesQuery.preload('definition');
      });
    }

    if (preloadOptions.switchTurn) {
      queryBuilder.preload('budgets', (budgetsQuery) => {
        budgetsQuery.preload('definition');
      });
      queryBuilder.preload('taxes', (taxesQuery) => {
        taxesQuery.preload('definition');
      });
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
