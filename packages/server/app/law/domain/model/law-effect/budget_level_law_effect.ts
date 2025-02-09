import { column } from '@adonisjs/lucid/orm';
import LawEffect from '#law/domain/model/law-effect/law_effect';
import type { BudgetLevel } from '#state/domain/model/budget_level';
import type { BudgetType } from '#state/domain/model/budget_type';

export default class BudgetLevelLawEffect extends LawEffect {
  @column()
  declare budgetType: BudgetType;

  @column()
  declare level: BudgetLevel;
}
