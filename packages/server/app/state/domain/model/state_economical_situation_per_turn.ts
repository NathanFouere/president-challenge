import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import { SaveAmountForTurn } from '#common/model/save_amount_for_turn';
import State from '#state/domain/model/state';

export default class StateEconomicalSituationPerTurn extends SaveAmountForTurn {
  public static readonly tableName = 'state_economical_situation_per_turns';

  @column()
  declare stateId: number;

  @belongsTo(() => State)
  declare state: BelongsTo<typeof State>;

  constructor() {
    super();
    this.color = 'blue';
  }
}
