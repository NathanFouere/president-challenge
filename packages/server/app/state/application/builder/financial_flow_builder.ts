import FinancialFlow from '#state/domain/model/financial_flow';

export default class FinancialFlowBuilder {
  private amount: number | null = null;
  private color: string | null = null;
  private name: string | null = null;
  private stateFinancialFlowId: number | null = null;

  public withAmount(amount: number): this {
    this.amount = amount;
    return this;
  }

  public withStateFinancialFlowId(stateFinancialFlowId: number): this {
    this.stateFinancialFlowId = stateFinancialFlowId;
    return this;
  }

  public withColor(color: string): this {
    this.color = color;
    return this;
  }

  public withName(name: string): this {
    this.name = name;
    return this;
  }

  public build(): FinancialFlow {
    const financialFlow = new FinancialFlow();

    if (this.amount !== null) financialFlow.amount = this.amount;
    else throw new Error('Amount is required');
    if (this.color) financialFlow.color = this.color;
    else throw new Error('Color is required');
    if (this.name) financialFlow.name = this.name;
    else throw new Error('Name is required');
    if (this.stateFinancialFlowId) financialFlow.stateTurnFinancialFlowsId = this.stateFinancialFlowId;
    else throw new Error('State financial flow id is required');

    return financialFlow;
  }

  public async exist(): Promise<FinancialFlow> {
    const financialFlow = this.build();
    await financialFlow.save();
    return financialFlow;
  }
}

export function aFinancialFlow(): FinancialFlowBuilder {
  return new FinancialFlowBuilder();
}
