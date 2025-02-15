import type { BudgetType } from '#budget/domain/model/budget_type';

export default class GetBudgetByGameAndTypeQuery {
  constructor(
    public readonly gameId: number,
    public readonly budgetType: BudgetType,
  ) {
  }
}
