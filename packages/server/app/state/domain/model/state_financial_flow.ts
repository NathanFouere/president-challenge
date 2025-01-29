import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import FinancialFlow from '#common/model/financial_flow';
import State from '#state/domain/model/state';

export default class StateFinancialFlow extends FinancialFlow {
  @column()
  declare stateId: number;

  @belongsTo(() => State)
  declare state: BelongsTo<typeof State>;
}
