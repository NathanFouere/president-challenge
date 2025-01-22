import { inject } from '@adonisjs/core';
import stateStartupConfig from '#game-config/state/state-startup-config.json' assert { type: 'json' };
import { aState } from '#state/application/builder/state_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IStateRepository from '#state/domain/repository/i_state_repository';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IBudgetRepository from '#state/domain/repository/i_budget_repository';
import type State from '#state/domain/model/state';
import { aBudget } from '#state/application/builder/budget_builder';
import budgetStartupConfig from '#game-config/budget/budget-startup-config.json' assert { type: 'json' };

@inject()
export class StateStartupService implements StartupProcessorStep {
  constructor(
    private readonly stateRepository: IStateRepository,
    private readonly budgetRepository: IBudgetRepository,
  ) {
  }

  public async execute(gameId: number): Promise<void> {
    const state = await this.createState(gameId);
    await this.createBudgets(state);
  }

  private async createState(gameId: number): Promise<State> {
    const state = aState()
      .withGameId(gameId)
      .withName(stateStartupConfig.name)
      .withDescription(stateStartupConfig.description)
      .withFlagIdentifier(stateStartupConfig.licensedFileIdentifier)
      .withEconomicalSituation(stateStartupConfig.economicalSituation)
      .build();

    await this.stateRepository.save(state);

    return state;
  }

  private async createBudgets(state: State): Promise<void> {
    const budgets = budgetStartupConfig.map((budget) => {
      return aBudget()
        .withName(budget.name)
        .withDescription(budget.description)
        .withLicensedFileIdentifier(budget.licensedFileIdentifier)
        .withLevel(budget.level)
        .withStateId(state.id)
        .withColor(budget.color)
        .build();
    });

    await this.budgetRepository.createMany(budgets);
  }
}
