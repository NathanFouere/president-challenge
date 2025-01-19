import { inject } from '@adonisjs/core';
import type { LevelDto, MinimalBudgetDto } from '@shared/dist/state/minimal-budget-dto.js';
import type Budget from '#state/domain/model/budget';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
import { BudgetLevel } from '#state/domain/model/budget_level';

@inject()
export class MinimalBudgetDtoFactory {
  constructor(
    private readonly licensedFileDtoFactory: LicensedFileDTOFactory,
  ) {
  }

  public createFromBudgets(budgets: Budget[]): MinimalBudgetDto[] {
    return budgets.map(budget => this.createFromBudget(budget));
  }

  public createFromBudget(budget: Budget): MinimalBudgetDto {
    return {
      id: budget.id,
      name: budget.name,
      color: budget.color,
      description: budget.description,
      level: this.createBudgetLevelFromLevel(budget.level),
      cost: budget.getCost(),
      licensedFile: this.licensedFileDtoFactory.createFromLicensedFile(budget.licensedFile),
    };
  }

  private createBudgetLevelFromLevel(budgetLevel: BudgetLevel): LevelDto {
    switch (budgetLevel) {
      case BudgetLevel.VERY_LOW:
        return { name: 'Very-Low', color: '#FF0000' };
      case BudgetLevel.LOW:
        return { name: 'Low', color: '#FFA500' };
      case BudgetLevel.MEDIUM:
        return { name: 'Medium', color: '#FFFF00' };
      case BudgetLevel.HIGH:
        return { name: 'High', color: '#008000' };
      case BudgetLevel.VERY_HIGH:
        return { name: 'Very-High', color: '#0000FF' };
    }
  };
}
