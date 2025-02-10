import { inject } from '@adonisjs/core';
import type Law from '#law/domain/model/law';
import type SocialClassLawHappinessEffect from '#social-class/domain/models/social_class_law_happiness_effect';
import GetSocialClassByGameAndTypeQuery
  from '#social-class/application/queries/get_social_class_by_game_and_type_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSocialClassByGameAndTypeQueryHandler
  from '#social-class/application/queries/i_get_social_class_by_game_and_type_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISocialClassHappinessModifierRepository
  from '#social-class/domain/repository/i_social_class_happiness_modifier_repository';

@inject()
export default class RemoveHappinessEffectFromLawService {
  constructor(
    private readonly getSocialClassByGameAndTypeQueryHandler: IGetSocialClassByGameAndTypeQueryHandler,
    private readonly socialClassHappinessModifierRepository: ISocialClassHappinessModifierRepository,
  ) {
  }

  public async removeSocialClassesHappinessEffects(laws: Law[], gameId: number): Promise<void> {
    const happinessModifierCreationPromises = [];
    for (const law of laws) {
      for (const socialClassHappinessEffect of law.lawEffect.socialClassesHappinessEffects) {
        happinessModifierCreationPromises.push(this.removeSocialClassHappinessEffect(law, socialClassHappinessEffect, gameId));
      }
    }
    await Promise.all(happinessModifierCreationPromises);
  }

  private async removeSocialClassHappinessEffect(law: Law, socialClassHappinessEffect: SocialClassLawHappinessEffect, gameId: number): Promise<void> {
    const socialClass = await this.getSocialClassByGameAndTypeQueryHandler.handleForLawEffects(new GetSocialClassByGameAndTypeQuery(
      gameId,
      socialClassHappinessEffect.socialClassType,
    ));
    for (const happinessModifier of socialClass.happinessModifiers) {
      if (happinessModifier.lawOriginId === law.id) {
        await this.socialClassHappinessModifierRepository.delete(happinessModifier);
      }
    }
  }
}
