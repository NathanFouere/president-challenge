import StateRevenuePerMonth from '#state/domain/model/state_revenue_per_month';
import { SaveAmountForTurnBuilder } from '#common/builder/save_amount_for_turn_builder';

export default class StateRevenuePerMonthBuilder extends SaveAmountForTurnBuilder {
  private stateId: number | null = null;

  public withStateId(stateId: number): this {
    this.stateId = stateId;
    return this;
  }

  public build(): StateRevenuePerMonth {
    const stateRevenuePerMonth = new StateRevenuePerMonth();

    if (this.amount) stateRevenuePerMonth.amount = this.amount;
    else throw new Error('Amount is required');
    if (this.turn) stateRevenuePerMonth.turn = this.turn;
    else throw new Error('Turn is required');
    if (this.stateId) stateRevenuePerMonth.stateId = this.stateId;
    else throw new Error('State id is required');

    return stateRevenuePerMonth;
  }
}

export function aStateRevenuePerMonth(): StateRevenuePerMonthBuilder {
  return new StateRevenuePerMonthBuilder();
}
