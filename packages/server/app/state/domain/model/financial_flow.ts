import { belongsTo, column, BaseModel } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import StateTurnFinancialFlows from '#state/domain/model/state_turn_financial_flows';

export default class FinancialFlow extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare amount: number;

  @column()
  declare color: string;

  @column()
  declare name: string;

  @column()
  declare stateTurnFinancialFlowsId: number;

  @belongsTo(() => StateTurnFinancialFlows)
  declare stateTurnFinancialFlows: BelongsTo<typeof StateTurnFinancialFlows>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
