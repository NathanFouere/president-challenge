import type Tax from '#tax/domain/model/tax';
import type StateFinancialFlow from '#state/domain/model/state_financial_flow';
import type State from '#state/domain/model/state';
import { aStateFinancialFlow } from '#state/application/builder/state_financial_flow_builder';

export default class StateFinancialFlowFactory {
  public createFromTax(tax: Tax, amount: number, state: State, turn: number): StateFinancialFlow {
    return aStateFinancialFlow()
      .withAmount(amount)
      .withColor(tax.color)
      .withName(tax.name)
      .withTurn(turn)
      .withStateId(state.id)
      .build();
  }

  public createFromSector(generatedRevenue: number, state: State, turn: number): StateFinancialFlow {
    return aStateFinancialFlow()
      .withAmount(generatedRevenue)
      .withColor('green')
      .withName('Sectors')
      .withTurn(turn)
      .withStateId(state.id)
      .build();
  }
}
