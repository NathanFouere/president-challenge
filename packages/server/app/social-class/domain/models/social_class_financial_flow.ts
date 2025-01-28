import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import FinancialFlow from '#common/model/financial_flow';
import SocialClassTurnFinancialFlows from '#social-class/domain/models/social_class_turn_financial_flows';

export default class SocialClassFinancialFlow extends FinancialFlow {
  @column()
  declare socialClassTurnFinancialFlowsId: number;

  @belongsTo(() => SocialClassTurnFinancialFlows)
  declare socialClassTurnFinancialFlows: BelongsTo<typeof SocialClassTurnFinancialFlows>;
}
