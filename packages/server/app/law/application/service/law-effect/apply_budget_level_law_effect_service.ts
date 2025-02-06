import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import BudgetRepository from '#state/infrastructure/repository/budget_repository';
import type BudgetLevelLawEffect from '#law/domain/model/law-effect/budget_level_law_effect';

@inject()
export default class ApplyBudgetLevelLawEffectService {
  constructor(
    private readonly budgetRepository: BudgetRepository,
  ) {
  }

  public async applyBudgetLevelLawEffect(budgetLevelLawEffect: BudgetLevelLawEffect): Promise<void> {
    budgetLevelLawEffect.apply();

    await this.budgetRepository.save(budgetLevelLawEffect.budget);
  }
}
