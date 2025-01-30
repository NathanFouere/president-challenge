import { inject } from '@adonisjs/core';
import type Tax from '#tax/domain/model/tax';
import type SocialClass from '#social-class/domain/models/social_class';
import type State from '#state/domain/model/state';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import StateFinancialFlowFactory from '#state/application/factory/state_financial_flow_factory';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassFinancialFlowFactory from '#social-class/application/factory/social_class_financial_flow_factory';

@inject()
export default class IncomeTaxService {
  constructor(
    private readonly stateFinancialFlowFactory: StateFinancialFlowFactory,
    private readonly socialClassFinancialFlowFactory: SocialClassFinancialFlowFactory,
  ) {
  }

  public applyIncomeTaxes(socialClasses: SocialClass[], state: State, tax: Tax, turn: number): void {
    let taxGenerated = 0;

    for (const socialClassTurnContext of socialClasses) {
      taxGenerated += this.makeSocialClassPayIncomeTax(socialClassTurnContext, tax, turn);
    }

    state.addToEconomicalSituation(taxGenerated);

    const financialFlowFromTax = this.stateFinancialFlowFactory.createFromTax(tax, taxGenerated, state, turn);

    state.financialFlows.push(financialFlowFromTax);
  }

  private makeSocialClassPayIncomeTax(socialClass: SocialClass, tax: Tax, turn: number): number {
    const taxGenerated = socialClass.payTaxOnRevenue(tax);

    const financialFlowFromTax = this.socialClassFinancialFlowFactory.createFromTax(socialClass, tax, taxGenerated, turn);
    socialClass.financialFlows.push(financialFlowFromTax);

    return taxGenerated;
  }
}
