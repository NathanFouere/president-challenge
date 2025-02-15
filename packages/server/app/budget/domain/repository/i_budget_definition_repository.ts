import type BudgetDefinition from '#budget/domain/model/budget_definition';

export default abstract class IBudgetDefinitionRepository {
  abstract save(budget: BudgetDefinition): Promise<void>;
  abstract createMany(budgets: BudgetDefinition[]): Promise<void>;
  abstract findAll(): Promise<BudgetDefinition[]>;
}
