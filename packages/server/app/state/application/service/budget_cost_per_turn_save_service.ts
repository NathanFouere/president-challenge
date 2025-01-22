import { inject } from '@adonisjs/core';
import type Budget from '#state/domain/model/budget';
import { aBudgetLevelPerTurn } from '#state/application/builder/budget_level_per_turn_builder';

@inject()
export default class BudgetCostPerTurnSaveService {
  public async saveBudgetsCostForTurn(
    budgets: Budget[],
    turn: number,
  ): Promise<void> {
    const saveBudgetCostPromises = budgets.map((budget: Budget) =>
      this.saveBudgetCostForTurn(budget, turn),
    );
    await Promise.all(saveBudgetCostPromises);
  }

  private async saveBudgetCostForTurn(
    budget: Budget,
    turn: number,
  ): Promise<void> {
    await aBudgetLevelPerTurn()
      .withBudgetId(budget.id)
      .withAmount(budget.level)
      .withTurn(turn)
      .exist();
  }
}
