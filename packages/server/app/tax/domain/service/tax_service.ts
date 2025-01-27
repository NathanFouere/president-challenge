import { inject } from '@adonisjs/core';
import type Tax from '#tax/domain/model/tax';
import type State from '#state/domain/model/state';
import type StateTurnFinancialFlows from '#state/domain/model/state_turn_financial_flows';
import type SocialClass from '#social-class/domain/models/social_class';
import { TaxType } from '#tax/domain/model/tax_type';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IncomeTaxService from '#tax/domain/service/income_tax_service';

@inject()
export default class TaxService {
  constructor(
    private readonly incomeTaxService: IncomeTaxService,
  ) {
  }

  public async applyTaxes(taxes: Tax[], socialClasses: SocialClass[], state: State, stateTurnFinancialFlows: StateTurnFinancialFlows): Promise<void> {
    await Promise.all(taxes.map((tax) => {
      switch (tax.type) {
        case TaxType.INCOME:
          return this.incomeTaxService.applyIncomeTaxes(socialClasses, state, tax, stateTurnFinancialFlows);
        default:
          throw new Error('Tax type not implemented');
      }
    }));
  }
}
