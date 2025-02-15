import type Budget from '#budget/domain/model/budget';

export default abstract class IBudgetRepository {
  abstract save(budget: Budget): Promise<void>;
  abstract createMany(budgets: Budget[]): Promise<void>;
}
