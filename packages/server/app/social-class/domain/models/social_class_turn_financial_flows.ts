import { belongsTo, column, BaseModel, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import SocialClassFinancialFlow from '#social-class/domain/models/social_class_financial_flow';
import SocialClass from '#social-class/domain/models/social_class';

export default class SocialClassTurnFinancialFlows extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare turn: number;

  @column()
  declare socialClassId: number;

  @belongsTo(() => SocialClass)
  declare socialClass: BelongsTo<typeof SocialClass>;

  @hasMany(() => SocialClassFinancialFlow)
  declare financialFlows: HasMany<typeof SocialClassFinancialFlow>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
