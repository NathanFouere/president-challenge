import { belongsTo, column, BaseModel, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import State from '#state/domain/model/state';
import FinancialFlow from '#state/domain/model/financial_flow';

export default class StateTurnFinancialFlows extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare stateId: number;

  @column()
  declare turn: number;

  @belongsTo(() => State)
  declare state: BelongsTo<typeof State>;

  @hasMany(() => FinancialFlow)
  declare financialFlows: HasMany<typeof FinancialFlow>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
