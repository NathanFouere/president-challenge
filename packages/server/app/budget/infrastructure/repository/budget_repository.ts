import type IBudgetRepository from '#budget/domain/repository/i_budget_repository';
import Budget from '#budget/domain/model/budget';

export default class BudgetRepository implements IBudgetRepository {
  public async save(budget: Budget): Promise<void> {
    await budget.save();
  }

  public async createMany(budgets: Budget[]): Promise<void> {
    await Budget.createMany(budgets);
  }
}
