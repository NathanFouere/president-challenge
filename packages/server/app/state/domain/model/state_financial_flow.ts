import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import StateTurnFinancialFlows from '#state/domain/model/state_turn_financial_flows';
import FinancialFlow from '#common/model/financial_flow';

export default class StateFinancialFlow extends FinancialFlow {
  @column()
  declare stateTurnFinancialFlowsId: number;

  @belongsTo(() => StateTurnFinancialFlows)
  declare stateTurnFinancialFlows: BelongsTo<typeof StateTurnFinancialFlows>;
}
