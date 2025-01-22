import { inject } from '@adonisjs/core';

import type State from '#state/domain/model/state';
import { aStateRevenuePerTurn } from '#state/application/builder/state_revenue_per_turn_builder';

@inject()
export class StateRevenuePerTurnSaveService {
  public async saveStateEconomicalSituationForTurn(state: State, turn: number): Promise<void> {
    await aStateRevenuePerTurn()
      .withStateId(state.id)
      .withAmount(state.economicalSituation)
      .withTurn(turn)
      .exist();
  }
}
