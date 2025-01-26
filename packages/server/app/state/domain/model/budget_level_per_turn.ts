import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import { SaveAmountForTurn } from '#common/model/save_amount_for_turn';
import Budget from '#state/domain/model/budget';

export default class BudgetLevelPerTurn extends SaveAmountForTurn {
  public static readonly table = 'budget_level_per_turns';

  @column()
  declare budgetId: number;

  @belongsTo(() => Budget)
  declare budget: BelongsTo<typeof Budget>;
}
