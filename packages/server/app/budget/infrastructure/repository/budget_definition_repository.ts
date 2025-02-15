import BudgetDefinition from '#budget/domain/model/budget_definition';
import type IBudgetDefinitionRepository from '#budget/domain/repository/i_budget_definition_repository';

export default class BudgetDefinitionRepository implements IBudgetDefinitionRepository {
  public async save(budget: BudgetDefinition): Promise<void> {
    await budget.save();
  }

  public async createMany(budgets: BudgetDefinition[]): Promise<void> {
    await BudgetDefinition.createMany(budgets);
  }

  public async findAll(): Promise<BudgetDefinition[]> {
    return await BudgetDefinition.all();
  }
}
