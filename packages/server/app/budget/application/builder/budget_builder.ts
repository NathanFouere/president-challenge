import type { BudgetLevel } from '#budget/domain/model/budget_level';
import Budget from '#budget/domain/model/budget';

export default class BudgetBuilder {
  private level: BudgetLevel | null = null;
  private stateId: number | null = null;
  private gameId: number | null = null;
  private definitionId: number | null = null;

  public withDefinitionId(definitionId: number): this {
    this.definitionId = definitionId;
    return this;
  }

  public withGameId(gameId: number): this {
    this.gameId = gameId;
    return this;
  }

  public withLevel(level: BudgetLevel): this {
    this.level = level;
    return this;
  }

  public withStateId(stateId: number): this {
    this.stateId = stateId;
    return this;
  }

  public build(): Budget {
    const budget = new Budget();

    if (this.level) budget.level = this.level;
    else throw new Error('Base cost is required');
    if (this.stateId) budget.stateId = this.stateId;
    else throw new Error('State id is required');
    if (this.gameId) budget.gameId = this.gameId;
    else throw new Error('Game id is required');
    if (this.definitionId) budget.definitionId = this.definitionId;
    else throw new Error('Definition id is required');

    return budget;
  }
}

export function aBudget(): BudgetBuilder {
  return new BudgetBuilder();
}
