import StateTurnFinancialFlows from '#state/domain/model/state_turn_financial_flows';

export default class StateTurnFinancialFlowsBuilder {
  private stateId: number | null = null;
  private turn: number | null = null;

  public withStateId(stateId: number): this {
    this.stateId = stateId;
    return this;
  }

  public withTurn(turn: number): this {
    this.turn = turn;
    return this;
  }

  public build(): StateTurnFinancialFlows {
    const stateEconomicalSituationPerTurn = new StateTurnFinancialFlows();

    if (this.turn) stateEconomicalSituationPerTurn.turn = this.turn;
    else throw new Error('Turn is required');
    if (this.stateId) stateEconomicalSituationPerTurn.stateId = this.stateId;
    else throw new Error('State id is required');

    return stateEconomicalSituationPerTurn;
  }

  public async exist(): Promise<StateTurnFinancialFlows> {
    const stateEconomicalSituationPerTurn = this.build();
    await stateEconomicalSituationPerTurn.save();
    return stateEconomicalSituationPerTurn;
  }
}

export function aStateTurnFinancialFlows(): StateTurnFinancialFlowsBuilder {
  return new StateTurnFinancialFlowsBuilder();
}
