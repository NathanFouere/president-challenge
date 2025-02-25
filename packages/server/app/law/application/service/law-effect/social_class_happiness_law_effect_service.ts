import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSocialClassesByGameAndTypeQueryHandler
  from '#social-class/application/queries/i_get_social_classes_by_game_and_type_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISocialClassHappinessModifierRepository
  from '#social-class/domain/repository/i_social_class_happiness_modifier_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassHappinessModifierFactory
  from '#social-class/application/factory/social_class_happiness_modifier_factory';
import type SocialClassTypeLawHappinessEffect from '#social-class/domain/models/social_class_type_law_happiness_effect';
import GetSocialClassesByGameAndTypeQuery
  from '#social-class/application/queries/get_social_classes_by_game_and_type_query';
import type Law from '#law/domain/model/law';

@inject()
export default class SocialClassHappinessLawEffectService {
  constructor(
    private readonly getSocialClassByGameAndTypeQueryHandler: IGetSocialClassesByGameAndTypeQueryHandler,
    private readonly socialClassHappinessModifierRepository: ISocialClassHappinessModifierRepository,
    private readonly socialClassHappinessModifierFactory: SocialClassHappinessModifierFactory,
  ) {
  }

  public async applySocialClassesHappinessEffects(law: Law, gameId: number): Promise<void> {
    const happinessModifierCreationPromises = [];
    for (const socialClassHappinessEffect of law.definition.socialClassesHappinessEffects) {
      happinessModifierCreationPromises.push(this.applySocialClassHappinessEffect(law, socialClassHappinessEffect, gameId));
    }
    await Promise.all(happinessModifierCreationPromises);
  }

  private async applySocialClassHappinessEffect(law: Law, socialClassHappinessEffect: SocialClassTypeLawHappinessEffect, gameId: number): Promise<void> {
    const socialClasses = await this.getSocialClassByGameAndTypeQueryHandler.handleForLawEffects(new GetSocialClassesByGameAndTypeQuery(
      gameId,
      socialClassHappinessEffect.socialClassType,
    ));
    for (const socialClass of socialClasses) {
      const happinessModifier = this.socialClassHappinessModifierFactory.createFromLaw(law, socialClassHappinessEffect, socialClass);
      await this.socialClassHappinessModifierRepository.save(happinessModifier);
    }
  }
}
