import { inject } from '@adonisjs/core';

import type State from '#state/domain/model/state';
import { aStateRevenuePerTurn } from '#state/application/builder/state_revenue_per_turn_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IStateEconomicalSituationPerTurnRepository
  from '#state/domain/repository/i_state_economical_situation_per_turn_repository';

@inject()
export class StateRevenuePerTurnSaveService {
  constructor(
    private readonly stateRevenueRepository: IStateEconomicalSituationPerTurnRepository,
  ) {
  }

  public async saveStateEconomicalSituationForMonth(state: State, turn: number): Promise<void> {
    const stateRevenueForMonth = aStateRevenuePerTurn()
      .withStateId(state.id)
      .withAmount(state.economicalSituation)
      .withTurn(turn)
      .build();

    await this.stateRevenueRepository.save(stateRevenueForMonth);
  }
}
