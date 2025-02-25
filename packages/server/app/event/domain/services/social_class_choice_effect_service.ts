import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassHappinessModifierFactory
  from '#social-class/application/factory/social_class_happiness_modifier_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSocialClassesByGameAndTypeQueryHandler
  from '#social-class/application/queries/i_get_social_classes_by_game_and_type_query_handler';
import type Choice from '#event/domain/models/choice';
import GetSocialClassesByGameAndTypeQuery
  from '#social-class/application/queries/get_social_classes_by_game_and_type_query';
import type SocialClassTypeChoiceHappinessEffect from '#social-class/domain/models/social_class_type_choice_happiness_effect';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISocialClassHappinessModifierRepository
  from '#social-class/domain/repository/i_social_class_happiness_modifier_repository';

@inject()
export class SocialClassChoiceEffectService {
  constructor(
    private readonly socialClassHappinessModifierFactory: SocialClassHappinessModifierFactory,
    private readonly getSocialClassByGameAndTypeQueryHandler: IGetSocialClassesByGameAndTypeQueryHandler,
    private readonly socialClassHappinessModifierRepository: ISocialClassHappinessModifierRepository,
  ) {
  }

  public async applyChoiceEffect(choice: Choice): Promise<void> {
    await Promise.all(choice.definition.socialClassHappinessEffects.map((socialClassChoiceHappinessEffect: SocialClassTypeChoiceHappinessEffect) => {
      this.applySocialClassesChoiceEffect(choice, socialClassChoiceHappinessEffect);
    }));
  }

  private async applySocialClassesChoiceEffect(choice: Choice, socialClassChoiceHappinessEffect: SocialClassTypeChoiceHappinessEffect): Promise<void> {
    const socialClasses = await this.getSocialClassByGameAndTypeQueryHandler.handle(new GetSocialClassesByGameAndTypeQuery(
      choice.gameId,
      socialClassChoiceHappinessEffect.socialClassType,
    ));

    const happinessModifiers = [];
    for (const socialClass of socialClasses) {
      const happinessModifier = this.socialClassHappinessModifierFactory.createFromChoice(choice.definition, socialClassChoiceHappinessEffect, socialClass);
      happinessModifiers.push(happinessModifier);
    }

    await this.socialClassHappinessModifierRepository.createMany(happinessModifiers);
  }
}
