import { inject } from '@adonisjs/core';

import type { BudgetDto } from '@shared/dist/state/budget-dto.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MinimalBudgetDtoFactory } from '#state/application/dto-factory/minimal_budget_dto_factory';
import type Budget from '#state/domain/model/budget';

@inject()
export default class BudgetDtoFactory {
  constructor(
    private readonly minimalBudgetDtoFactory: MinimalBudgetDtoFactory,
  ) {
  }

  public createFromBudget(budget: Budget): BudgetDto {
    return {
      ...this.minimalBudgetDtoFactory.createFromBudget(budget),
    };
  }
}
