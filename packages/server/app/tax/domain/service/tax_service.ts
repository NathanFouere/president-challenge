import { inject } from '@adonisjs/core';
import type Tax from '#tax/domain/model/tax';
import { TaxType } from '#tax/domain/model/tax_type';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import WealthTaxService from '#tax/domain/service/wealth_tax_service';
import type SocialClass from '#social-class/domain/models/social_class';
import type State from '#state/domain/model/state';

@inject()
export default class TaxService {
  constructor(
    private readonly wealthTaxService: WealthTaxService,
  ) {
  }

  public applyTaxes(taxes: Tax[], socialClasses: SocialClass[], state: State, turn: number): void {
    taxes.forEach((tax) => {
      switch (tax.type) {
        case TaxType.WEALTH:
          return this.wealthTaxService.applyWealthTaxes(socialClasses, state, tax, turn);
        default:
          throw new Error('Tax type not implemented');
      }
    });
  }
}
