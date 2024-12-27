import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import { SaveAmountForTurn } from '#common/model/save_amount_for_turn';
import State from '#state/domain/model/state';

export default class StateRevenuePerMonth extends SaveAmountForTurn {
  public static tableName = 'state_revenue_per_month';

  @column()
  declare stateId: number;

  @belongsTo(() => State)
  declare state: BelongsTo<typeof State>;
}
