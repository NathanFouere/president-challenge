import { inject } from '@adonisjs/core';
import GetSocialClassesByGameAndTypeQuery
  from '#social-class/application/queries/get_social_classes_by_game_and_type_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSocialClassesByGameAndTypeQueryHandler
  from '#social-class/application/queries/i_get_social_classes_by_game_and_type_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISocialClassHappinessModifierRepository
  from '#social-class/domain/repository/i_social_class_happiness_modifier_repository';
import type Law from '#law/domain/model/law';

@inject()
export default class RemoveSocialClassHappinessEffectFromLawService {
  constructor(
    private readonly getSocialClassByGameAndTypeQueryHandler: IGetSocialClassesByGameAndTypeQueryHandler,
    private readonly socialClassHappinessModifierRepository: ISocialClassHappinessModifierRepository,
  ) {
  }

  public async removeSocialClassesHappinessEffectOfLaw(law: Law, gameId: number): Promise<void> {
    for (const socialClassHappinessEffect of law.definition.socialClassesHappinessEffects) {
      const socialClasses = await this.getSocialClassByGameAndTypeQueryHandler.handleForLawEffects(new GetSocialClassesByGameAndTypeQuery(
        gameId,
        socialClassHappinessEffect.socialClassType,
      ));
      for (const socialClass of socialClasses) {
        for (const happinessModifier of socialClass.happinessModifiers) {
          if (happinessModifier.lawOriginId === law.id) {
            await this.socialClassHappinessModifierRepository.delete(happinessModifier);
          }
        }
      }
    }
  }
}
