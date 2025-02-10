import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSocialClassByGameAndTypeQueryHandler
  from '#social-class/application/queries/i_get_social_class_by_game_and_type_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISocialClassHappinessModifierRepository
  from '#social-class/domain/repository/i_social_class_happiness_modifier_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassHappinessModifierFactory
  from '#social-class/application/factory/social_class_happiness_modifier_factory';
import type Law from '#law/domain/model/law';
import type SocialClassLawHappinessEffect from '#social-class/domain/models/social_class_law_happiness_effect';
import GetSocialClassByGameAndTypeQuery
  from '#social-class/application/queries/get_social_class_by_game_and_type_query';

@inject()
export default class SocialClassHappinessLawEffectService {
  constructor(
    private readonly getSocialClassByGameAndTypeQueryHandler: IGetSocialClassByGameAndTypeQueryHandler,
    private readonly socialClassHappinessModifierRepository: ISocialClassHappinessModifierRepository,
    private readonly socialClassHappinessModifierFactory: SocialClassHappinessModifierFactory,
  ) {
  }

  public async applySocialClassesHappinessEffects(law: Law, gameId: number): Promise<void> {
    const happinessModifierCreationPromises = [];
    for (const socialClassHappinessEffect of law.lawEffect.socialClassesHappinessEffects) {
      happinessModifierCreationPromises.push(this.applySocialClassHappinessEffect(law, socialClassHappinessEffect, gameId));
    }
    await Promise.all(happinessModifierCreationPromises);
  }

  private async applySocialClassHappinessEffect(law: Law, socialClassHappinessEffect: SocialClassLawHappinessEffect, gameId: number): Promise<void> {
    const socialClass = await this.getSocialClassByGameAndTypeQueryHandler.handleForLawEffects(new GetSocialClassByGameAndTypeQuery(
      gameId,
      socialClassHappinessEffect.socialClassType,
    ));
    const happinessModifier = this.socialClassHappinessModifierFactory.createFromLaw(law, socialClassHappinessEffect, socialClass);
    await this.socialClassHappinessModifierRepository.save(happinessModifier);
  }
}
