import { aStateEconomicalSituationPerTurn } from '#state/application/builder/state_economical_situation_per_turn_builder';
import type State from '#state/domain/model/state';

export default class StateEconomicalSituationPerTurnSaveService {
  public async saveStateEconomicalSituationForTurn(state: State, turn: number): Promise<void> {
    await aStateEconomicalSituationPerTurn()
      .withStateId(state.id)
      .withAmount(state.economicalSituation)
      .withTurn(turn)
      .exist();
  }
}
