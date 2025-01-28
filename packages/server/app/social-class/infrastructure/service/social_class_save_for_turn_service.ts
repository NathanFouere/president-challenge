import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISocialClassHappinessModifierRepository
  from '#social-class/domain/repository/i_social_class_happiness_modifier_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISocialClassRepository from '#social-class/domain/repository/i_social_class_repository';
import type SocialClass from '#social-class/domain/models/social_class';
import type { SocialClassTurnContext } from '#game/application/service/turn-service/load_turn_data_context_service';

@inject()
export default class SocialClassSaveForTurnService {
  constructor(
    private readonly socialClassRepository: ISocialClassRepository,
    private readonly socialClassHappinessModifierRepository: ISocialClassHappinessModifierRepository,
  ) {
  }

  public async saveSocialClassesForTurn(socialClassesTurnContexts: SocialClassTurnContext[]): Promise<void> {
    const promises = socialClassesTurnContexts.map(socialClassTurnContexts => this.saveSocialClassForTurn(socialClassTurnContexts.socialClass));
    await Promise.all(promises);
  }

  private async saveSocialClassForTurn(socialClass: SocialClass): Promise<void> {
    await this.socialClassRepository.save(socialClass);
    await this.socialClassHappinessModifierRepository.saveMany(socialClass.happinessModifiers);
  }
}
