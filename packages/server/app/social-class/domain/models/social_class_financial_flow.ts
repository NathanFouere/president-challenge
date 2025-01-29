import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import FinancialFlow from '#common/model/financial_flow';
import SocialClass from '#social-class/domain/models/social_class';

export default class SocialClassFinancialFlow extends FinancialFlow {
  @column()
  declare socialClassId: number;

  @belongsTo(() => SocialClass)
  declare socialClass: BelongsTo<typeof SocialClass>;
}
