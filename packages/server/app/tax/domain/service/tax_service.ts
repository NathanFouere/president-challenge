import { inject } from '@adonisjs/core';
import type Tax from '#tax/domain/model/tax';
import type State from '#state/domain/model/state';
import type StateTurnFinancialFlows from '#state/domain/model/state_turn_financial_flows';
import type SocialClass from '#social-class/domain/models/social_class';
import { TaxType } from '#tax/domain/model/tax_type';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IncomeTaxFinancialFlowService from '#tax/domain/service/income_tax_financial_flow_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IFinancialFlowRepository from '#state/domain/repository/i_financial_flow_repository';

@inject()
export default class TaxesFinancialFlowService {
  constructor(
    private readonly incomeTaxFinancialFlowService: IncomeTaxFinancialFlowService,
    private readonly financialFlowRepository: IFinancialFlowRepository,
  ) {
  }

  public async makeSocialClassesPayTaxes(taxes: Tax[], socialClasses: SocialClass[], state: State, stateTurnFinancialFlows: StateTurnFinancialFlows): Promise<void> {
    const financialFlowsGenerationPromises = [];
    for (const tax of taxes) {
      switch (tax.type) {
        case TaxType.INCOME:
          financialFlowsGenerationPromises.push(this.incomeTaxFinancialFlowService.taxFromIncome(socialClasses, state, tax, stateTurnFinancialFlows));
          break;
        default:
          throw new Error('Tax type not implemented');
      }
    }
    const financialFlows = await Promise.all(financialFlowsGenerationPromises);
    await this.financialFlowRepository.createMany(financialFlows);
  }
}
