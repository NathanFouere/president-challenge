import type IBudgetRepository from '#state/domain/repository/i_budget_repository';
import Budget from '#state/domain/model/budget';

export default class BudgetRepository implements IBudgetRepository {
  public async save(budget: Budget): Promise<void> {
    await budget.save();
  }

  public async createMany(budgets: Budget[]): Promise<void> {
    await Budget.createMany(budgets);
  }
}
