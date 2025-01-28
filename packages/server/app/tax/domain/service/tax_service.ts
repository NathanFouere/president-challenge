import { inject } from '@adonisjs/core';
import type Tax from '#tax/domain/model/tax';
import { TaxType } from '#tax/domain/model/tax_type';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IncomeTaxService from '#tax/domain/service/income_tax_service';
import type {
  SocialClassTurnContext,
  StateTurnContext,
} from '#game/application/service/turn-service/load_turn_data_context_service';

@inject()
export default class TaxService {
  constructor(
    private readonly incomeTaxService: IncomeTaxService,
  ) {
  }

  public async applyTaxes(taxes: Tax[], socialClassTurnContexts: SocialClassTurnContext[], stateTurnContext: StateTurnContext): Promise<void> {
    await Promise.all(taxes.map((tax) => {
      switch (tax.type) {
        case TaxType.INCOME:
          return this.incomeTaxService.applyIncomeTaxes(socialClassTurnContexts, stateTurnContext, tax);
        default:
          throw new Error('Tax type not implemented');
      }
    }));
  }
}
