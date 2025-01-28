import type SocialClass from '#social-class/domain/models/social_class';
import type State from '#state/domain/model/state';
import type Tax from '#tax/domain/model/tax';
import type StateTurnFinancialFlows from '#state/domain/model/state_turn_financial_flows';
import { aStateFinancialFlow } from '#state/application/builder/state_financial_flow_builder';

export default class IncomeTaxService {
  private readonly BASE_INCOME_TAX = 0.05;
  private readonly INCOME_TAX_COLOR = 'red';

  public async applyIncomeTaxes(socialClasses: SocialClass[], state: State, tax: Tax, stateTurnFinancialFlows: StateTurnFinancialFlows): Promise<void> {
    const taxGenerated = socialClasses.reduce((acc, socialClass) => acc + this.makeSocialClassesPayIncomeTax(socialClass, tax), 0);

    state.addToEconomicalSituation(taxGenerated);

    await aStateFinancialFlow()
      .withStateFinancialFlowId(stateTurnFinancialFlows.id)
      .withAmount(taxGenerated)
      .withColor(this.INCOME_TAX_COLOR)
      .withName('Income taxes')
      .exist();
  }

  private makeSocialClassesPayIncomeTax(socialClass: SocialClass, tax: Tax): number {
    const taxGenerated = Math.round(Math.max(0, socialClass.economicalSituation * (tax.level * this.BASE_INCOME_TAX)));
    if (taxGenerated != 0) {
      socialClass.addEconomicalSituation(-taxGenerated);
    }

    return taxGenerated;
  }
}
