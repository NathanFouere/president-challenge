import type Tax from '#tax/domain/model/tax';
import { aStateFinancialFlow } from '#state/application/builder/state_financial_flow_builder';
import type {
  SocialClassTurnContext,
  StateTurnContext,
} from '#game/application/service/turn-service/load_turn_data_context_service';
import { aSocialClassFinancialFlow } from '#social-class/application/builders/social_class_financial_flow_builder';

export default class IncomeTaxService {
  private readonly BASE_INCOME_TAX = 0.05;
  private readonly INCOME_TAX_COLOR = 'red';

  public async applyIncomeTaxes(socialClassesTurnContext: SocialClassTurnContext[], stateTurnContext: StateTurnContext, tax: Tax): Promise<void> {
    let taxGenerated = 0;

    for (const socialClassTurnContext of socialClassesTurnContext) {
      taxGenerated += await this.makeSocialClassesPayIncomeTax(socialClassTurnContext, tax);
    }

    stateTurnContext.state.addToEconomicalSituation(taxGenerated);

    await aStateFinancialFlow()
      .withStateFinancialFlowId(stateTurnContext.stateTurnFinancialFlows.id)
      .withAmount(taxGenerated)
      .withColor(this.INCOME_TAX_COLOR)
      .withName('Income taxes')
      .exist();
  }

  private async makeSocialClassesPayIncomeTax(socialClassTurnContext: SocialClassTurnContext, tax: Tax): Promise<number> {
    const taxGenerated = Math.round(Math.max(0, socialClassTurnContext.socialClass.economicalSituation * (tax.level * this.BASE_INCOME_TAX)));
    if (taxGenerated != 0) {
      socialClassTurnContext.socialClass.addEconomicalSituation(-taxGenerated);
    }

    await aSocialClassFinancialFlow()
      .withSocialClassFinancialFlowId(socialClassTurnContext.socialClassTurnFinancialFlows.id)
      .withAmount(-taxGenerated)
      .withColor(this.INCOME_TAX_COLOR)
      .withName('Income taxes')
      .exist();

    return taxGenerated;
  }
}
