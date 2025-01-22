import { SaveAmountForTurnBuilder } from '#common/builder/save_amount_for_turn_builder';
import StateEconomicalSituationPerTurn from '#state/domain/model/state_economical_situation_per_turn';

export default class StateRevenuePerTurnBuilder extends SaveAmountForTurnBuilder {
  private stateId: number | null = null;

  public withStateId(stateId: number): this {
    this.stateId = stateId;
    return this;
  }

  public build(): StateEconomicalSituationPerTurn {
    const stateEconomicalSituationPerTurn = new StateEconomicalSituationPerTurn();

    if (this.amount !== null) stateEconomicalSituationPerTurn.amount = this.amount;
    else throw new Error('Amount is required');
    if (this.turn) stateEconomicalSituationPerTurn.turn = this.turn;
    else throw new Error('Turn is required');
    if (this.stateId) stateEconomicalSituationPerTurn.stateId = this.stateId;
    else throw new Error('State id is required');

    return stateEconomicalSituationPerTurn;
  }

  public async exist(): Promise<StateEconomicalSituationPerTurn> {
    const stateEconomicalSituationPerTurn = this.build();
    await stateEconomicalSituationPerTurn.save();
    return stateEconomicalSituationPerTurn;
  }
}

export function aStateRevenuePerTurn(): StateRevenuePerTurnBuilder {
  return new StateRevenuePerTurnBuilder();
}
