import type SocialClass from '#social-class/domain/models/social_class';
import type State from '#state/domain/model/state';
import type Tax from '#tax/domain/model/tax';
import type StateTurnFinancialFlows from '#state/domain/model/state_turn_financial_flows';
import type FinancialFlow from '#state/domain/model/financial_flow';
import { aFinancialFlow } from '#state/application/builder/financial_flow_builder';

export default class IncomeTaxFinancialFlowService {
  private readonly BASE_INCOME_TAX = 0.05;
  private readonly INCOME_TAX_COLOR = 'red';

  public async taxFromIncome(socialClasses: SocialClass[], state: State, tax: Tax, stateTurnFinancialFlows: StateTurnFinancialFlows): Promise<FinancialFlow> {
    let taxGenerated = 0;
    for (const socialClass of socialClasses) {
      taxGenerated += Math.round(Math.max(0, socialClass.economicalSituation * (tax.level * this.BASE_INCOME_TAX)));
      if (taxGenerated != 0) {
        socialClass.addEconomicalSituation(-taxGenerated);
      }
    }

    state.addToEconomicalSituation(taxGenerated);

    return await aFinancialFlow()
      .withStateFinancialFlowId(stateTurnFinancialFlows.id)
      .withAmount(taxGenerated)
      .withColor(this.INCOME_TAX_COLOR)
      .withName('Income taxes')
      .exist();
  }
}
