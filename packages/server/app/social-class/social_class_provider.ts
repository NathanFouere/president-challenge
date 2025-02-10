import AppProvider from '#common/provider';
import IGetSocialClassesOfGameQueryHandler
  from '#social-class/application/queries/i_get_social_classes_of_game_query_handler';
import ISocialClassRepository from '#social-class/domain/repository/i_social_class_repository';
import ISocialClassEconomicalSituationPerTurnRepository
  from '#social-class/domain/repository/i_social_class_economical_situation_per_turn_repository';
import IGetSocialClassOfGameQueryHandler
  from '#social-class/application/queries/i_get_social_class_of_game_query_handler';
import ISocialClassHappinessPerTurnRepository
  from '#social-class/domain/repository/i_social_class_happiness_per_turn_repository';
import ISocialClassHappinessModifierRepository
  from '#social-class/domain/repository/i_social_class_happiness_modifier_repository';
import ISocialClassLawHappinessEffectRepository
  from '#social-class/domain/repository/i_social_class_law_happiness_effect_repository';
import IGetSocialClassByGameAndTypeQueryHandler
  from '#social-class/application/queries/i_get_social_class_by_game_and_type_query_handler';

export default class SocialClassProvider extends AppProvider {
  public async boot(): Promise<void> {
    const { default: SocialClassRepository } = await import(
      '#social-class/infrastructure/repository/social_class_repository'
    );
    const { default: SocialClassEconomicalSituationPerTurnRepository } = await import(
      '#social-class/infrastructure/repository/social_class_economical_situation_per_turn_repository'
    );
    const { default: GetSocialClassOfGameQueryHandler } = await import(
      '#social-class/infrastructure/query/get_social_class_of_game_query_handler'
    );
    const { default: GetSocialClassesOfGameQueryHandler } = await import(
      '#social-class/infrastructure/query/get_social_classes_of_game_query_handler'
    );
    const { default: SocialClassHappinessPerTurnRepository } = await import(
      '#social-class/infrastructure/repository/social_class_happiness_per_turn_repository'
    );
    const { default: SocialClassHappinessModifierRepository } = await import(
      '#social-class/infrastructure/repository/social_class_happiness_modifier_repository'
    );
    const { default: SocialClassLawHappinessEffectRepository } = await import(
      '#social-class/infrastructure/repository/social_class_law_happiness_effect_repository'
    );

    const { default: GetSocialClassByGameAndTypeQueryHandler } = await import(
      '#social-class/infrastructure/query/get_social_class_by_game_and_type_query_handler'
    );

    this.app.container.bind(IGetSocialClassByGameAndTypeQueryHandler, () => {
      return new GetSocialClassByGameAndTypeQueryHandler();
    });

    this.app.container.bind(ISocialClassLawHappinessEffectRepository, () => {
      return new SocialClassLawHappinessEffectRepository();
    });

    this.app.container.bind(ISocialClassRepository, () => {
      return new SocialClassRepository();
    });

    this.app.container.bind(ISocialClassEconomicalSituationPerTurnRepository, () => {
      return new SocialClassEconomicalSituationPerTurnRepository();
    });

    this.app.container.bind(IGetSocialClassOfGameQueryHandler, () => {
      return new GetSocialClassOfGameQueryHandler();
    });

    this.app.container.bind(IGetSocialClassesOfGameQueryHandler, () => {
      return new GetSocialClassesOfGameQueryHandler();
    });
    this.app.container.bind(ISocialClassHappinessPerTurnRepository, () => {
      return new SocialClassHappinessPerTurnRepository();
    });

    this.app.container.bind(ISocialClassHappinessModifierRepository, () => {
      return new SocialClassHappinessModifierRepository();
    });
  }
}
