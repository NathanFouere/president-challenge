import { inject } from '@adonisjs/core';
import type SocialClass from '#social-class/domain/models/social_class';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassFinancialFlowFactory from '#social-class/application/factory/social_class_financial_flow_factory';

@inject()
export default class SocialClassEconomicalSituationEvolutionService {
  constructor(
    private readonly socialClassFinancialFlowFactory: SocialClassFinancialFlowFactory,
  ) {
  }

  public updateSocialClassesEconomicalSituation(socialClasses: SocialClass[], turn: number): void {
    socialClasses.map(socialClass => this.propagateSectorEconomicalSituationToSocialClass(socialClass, turn));
  }

  private propagateSectorEconomicalSituationToSocialClass(socialClass: SocialClass, turn: number): void {
    const generatedRevenuesFromSector = socialClass.generateRevenueFromSector();

    const financialFlowFromSector = this.socialClassFinancialFlowFactory.createFromSectorRevenue(socialClass, generatedRevenuesFromSector, turn);
    socialClass.financialFlows.push(financialFlowFromSector);
  }
}
