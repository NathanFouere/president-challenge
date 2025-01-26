import { SaveAmountForTurnBuilder } from '#common/builder/save_amount_for_turn_builder';
import BudgetLevelPerTurn from '#state/domain/model/budget_level_per_turn';

export default class BudgetLevelPerTurnBuilder extends SaveAmountForTurnBuilder {
  private budgetId: number | null = null;
  private color: string | null = null;

  public withBudgetId(budgetId: number): this {
    this.budgetId = budgetId;

    return this;
  }

  public withColor(color: string): this {
    this.color = color;

    return this;
  }

  public build(): BudgetLevelPerTurn {
    const budgetAmountPerTurn = new BudgetLevelPerTurn();

    if (this.amount !== null) budgetAmountPerTurn.amount = this.amount;
    else throw new Error('Amount is required');

    if (this.color) budgetAmountPerTurn.color = this.color;
    else throw new Error('Color is required');

    if (this.turn) budgetAmountPerTurn.turn = this.turn;
    else throw new Error('Turn is required');

    if (this.budgetId) budgetAmountPerTurn.budgetId = this.budgetId;
    else throw new Error('Budget id is required');

    return budgetAmountPerTurn;
  }

  public async exist(): Promise<BudgetLevelPerTurn> {
    const budgetLevelPerTurn = this.build();
    await budgetLevelPerTurn.save();

    return budgetLevelPerTurn;
  }
}

export function aBudgetLevelPerTurn(): BudgetLevelPerTurnBuilder {
  return new BudgetLevelPerTurnBuilder();
}
