import { inject } from '@adonisjs/core';
import type Tax from '#tax/domain/model/tax';
import { TaxType } from '#tax/domain/model/tax_type';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IncomeTaxService from '#tax/domain/service/income_tax_service';
import type SocialClass from '#social-class/domain/models/social_class';
import type State from '#state/domain/model/state';

@inject()
export default class TaxService {
  constructor(
    private readonly incomeTaxService: IncomeTaxService,
  ) {
  }

  public applyTaxes(taxes: Tax[], socialClasses: SocialClass[], state: State, turn: number): void {
    taxes.forEach((tax) => {
      switch (tax.type) {
        case TaxType.INCOME:
          return this.incomeTaxService.applyIncomeTaxes(socialClasses, state, tax, turn);
        default:
          throw new Error('Tax type not implemented');
      }
    });
  }
}
