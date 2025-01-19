import type Budget from '#state/domain/model/budget';

export default abstract class IBudgetRepository {
  abstract save(budget: Budget): Promise<void>;
  abstract createMany(budgets: Budget[]): Promise<void>;
}
