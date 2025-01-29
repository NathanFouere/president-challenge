import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISocialClassHappinessModifierRepository
  from '#social-class/domain/repository/i_social_class_happiness_modifier_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISocialClassRepository from '#social-class/domain/repository/i_social_class_repository';
import type SocialClass from '#social-class/domain/models/social_class';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISocialClassFinancialFlowRepository
  from '#social-class/domain/repository/i_social_class_financial_flow_repository';

@inject()
export default class SocialClassSaveForTurnService {
  constructor(
    private readonly socialClassRepository: ISocialClassRepository,
    private readonly socialClassHappinessModifierRepository: ISocialClassHappinessModifierRepository,
    private readonly socialClassFinancialFlowRepository: ISocialClassFinancialFlowRepository,
  ) {
  }

  public async saveSocialClassesForTurn(socialClasses: SocialClass[]): Promise<void> {
    const promises = socialClasses.map(socialClass => this.saveSocialClassForTurn(socialClass));
    await Promise.all(promises);
  }

  private async saveSocialClassForTurn(socialClass: SocialClass): Promise<void> {
    await this.socialClassRepository.save(socialClass);
    await this.socialClassHappinessModifierRepository.saveMany(socialClass.happinessModifiers);
    await this.socialClassFinancialFlowRepository.createMany(socialClass.financialFlows);
  }
}
