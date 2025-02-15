import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IBudgetDefinitionRepository from '#budget/domain/repository/i_budget_definition_repository';
import budgetStartupConfig from '#game-config/budget/budget-startup-config.json' assert { type: 'json' };
import { aBudgetDefinition } from '#budget/application/builder/budget_definition_builder';
import type { BudgetType } from '#budget/domain/model/budget_type';

@inject()
export default class BudgetDefinitionStartupService {
  constructor(
    private readonly budgetDefinitionRepository: IBudgetDefinitionRepository,
  ) {
  }

  public async execute(): Promise<void> {
    const budgets = budgetStartupConfig.map((budget) => {
      return aBudgetDefinition()
        .withName(budget.name)
        .withDescription(budget.description)
        .withLicensedFileIdentifier(budget.licensedFileIdentifier)
        .withLevel(budget.level)
        .withColor(budget.color)
        .withType(budget.type as BudgetType)
        .build();
    });

    await this.budgetDefinitionRepository.createMany(budgets);
  }
}
