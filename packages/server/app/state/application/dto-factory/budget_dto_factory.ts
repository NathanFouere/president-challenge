import { inject } from '@adonisjs/core';

import type { BudgetDto } from '@shared/dist/state/budget-dto.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MinimalBudgetDtoFactory } from '#state/application/dto-factory/minimal_budget_dto_factory';
import type Budget from '#state/domain/model/budget';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ChartDataFactory from '#common/utils/chart_data_factory';

@inject()
export default class BudgetDtoFactory {
  constructor(
    private readonly minimalBudgetDtoFactory: MinimalBudgetDtoFactory,
    private readonly chartDataFactory: ChartDataFactory,
  ) {
  }

  readonly budgetCostRangeLevels = [
    { min: 0, max: 1, value: 'Very-Low' },
    { min: 1, max: 2, value: 'Low' },
    { min: 2, max: 3, value: 'Medium' },
    { min: 3, max: 4, value: 'High' },
    { min: 4, max: 5, value: 'Very-High' },
  ];

  public createFromBudget(budget: Budget): BudgetDto {
    return {
      ...this.minimalBudgetDtoFactory.createFromBudget(budget),
      costPerMonthChartData: this.chartDataFactory.createFromAmountPerTurn(
        budget.levelPerTurn,
        'Cost',
        0,
        4,
        this.budgetCostRangeLevels,
      ),
    };
  }
}
