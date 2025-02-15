import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IBudgetDefinitionRepository from '#budget/domain/repository/i_budget_definition_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IBudgetRepository from '#budget/domain/repository/i_budget_repository';
import { aBudget } from '#budget/application/builder/budget_builder';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';
import { GetStateOfGameQuery } from '#state/application/query/get_state_of_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetStateOfGameQueryHandler from '#state/application/query/i_get_state_of_game_query_handler';

@inject()
export default class BudgetStartupService implements StartupProcessorStep {
  constructor(
    private readonly budgetDefinitionRepository: IBudgetDefinitionRepository,
    private readonly budgetRepository: IBudgetRepository,
    private readonly getStateOfGameQueryHandler: IGetStateOfGameQueryHandler,
  ) {
  }

  public async execute(gameId: number): Promise<void> {
    const state = await this.getStateOfGameQueryHandler.handle(new GetStateOfGameQuery(
      gameId,
    ));
    const budgetDefinitions = await this.budgetDefinitionRepository.findAll();

    const budgets = budgetDefinitions.map((budgetDefinition) => {
      return aBudget()
        .withGameId(gameId)
        .withDefinitionId(budgetDefinition.id)
        .withLevel(budgetDefinition.defaultLevel)
        .withStateId(state.id)
        .build();
    });

    await this.budgetRepository.createMany(budgets);
  }
}
