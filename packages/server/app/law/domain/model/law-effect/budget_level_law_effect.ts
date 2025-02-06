import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import LawEffect from '#law/domain/model/law-effect/law_effect';
import Budget from '#state/domain/model/budget';
import type { BudgetLevel } from '#state/domain/model/budget_level';

export default class BudgetLevelLawEffect extends LawEffect {
  @column()
  declare budgetId: number;

  @belongsTo(() => Budget)
  declare budget: BelongsTo<typeof Budget>;

  @column()
  declare level: BudgetLevel;

  public apply(): void {
    this.budget.level = this.level;
  }
}
