import StateFinancialFlow from '#state/domain/model/state_financial_flow';
import FinancialFlowBuilder from '#common/builder/financial_flow_builder';

export default class StateFinancialFlowBuilder extends FinancialFlowBuilder {
  private stateId: number | null = null;

  public withStateId(stateId: number): this {
    this.stateId = stateId;
    return this;
  }

  public build(): StateFinancialFlow {
    const financialFlow = new StateFinancialFlow();

    if (this.amount !== null) financialFlow.amount = this.amount;
    else throw new Error('Amount is required');
    if (this.color) financialFlow.color = this.color;
    else throw new Error('Color is required');
    if (this.name) financialFlow.name = this.name;
    else throw new Error('Name is required');
    if (this.turn) financialFlow.turn = this.turn;
    else throw new Error('Turn is required');
    if (this.stateId) financialFlow.stateId = this.stateId;
    else throw new Error('State id is required');

    return financialFlow;
  }

  public async exist(): Promise<StateFinancialFlow> {
    const financialFlow = this.build();
    await financialFlow.save();
    return financialFlow;
  }
}

export function aStateFinancialFlow(): StateFinancialFlowBuilder {
  return new StateFinancialFlowBuilder();
}
