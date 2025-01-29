import { inject } from '@adonisjs/core';
import type SocialClass from '#social-class/domain/models/social_class';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISocialClassFinancialFlowRepository
  from '#social-class/domain/repository/i_social_class_financial_flow_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassFinancialFlowFactory from '#social-class/application/factory/social_class_financial_flow_factory';

@inject()
export default class SocialClassEconomicalSituationEvolutionService {
  constructor(
    private readonly socialClassFinancialFlowRepository: ISocialClassFinancialFlowRepository,
    private readonly socialClassFinancialFlowFactory: SocialClassFinancialFlowFactory,
  ) {
  }

  public async updateSocialClassesEconomicalSituation(socialClasses: SocialClass[], turn: number): Promise<void> {
    await Promise.all(socialClasses.map(socialClass => this.propagateSectorEconomicalSituationToSocialClass(socialClass, turn)));
  }

  private async propagateSectorEconomicalSituationToSocialClass(socialClass: SocialClass, turn: number): Promise<void> {
    const generatedRevenuesFromSector = socialClass.generateRevenueFromSector();

    const socialClassFinancialFlow = this.socialClassFinancialFlowFactory.createFromSectorRevenue(socialClass, generatedRevenuesFromSector, turn);
    await this.socialClassFinancialFlowRepository.save(socialClassFinancialFlow);
  }
}
