import State from '#state/domain/model/state';
import type { GetStateOfGameQuery } from '#state/application/query/get_state_of_game_query';

export class GetStateOfGameQueryHandler {
  private async getStateOfGame(
    query: GetStateOfGameQuery,
    preloadOptions: { flag?: boolean; economicalSituationPerTurn?: boolean } = {},
  ): Promise<State> {
    const queryBuilder = State.query().where('game_id', query.gameId);

    if (preloadOptions.flag) {
      queryBuilder.preload('flag');
    }

    if (preloadOptions.economicalSituationPerTurn) {
      queryBuilder.preload('economicalSituationPerTurn');
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
    });
  }
}
