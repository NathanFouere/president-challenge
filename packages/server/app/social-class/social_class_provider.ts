import AppProvider from '#common/provider';
import IGetSocialClassesOfGameQueryHandler
  from '#social-class/application/queries/i_get_social_classes_of_game_query_handler';
import ISocialClassRepository from '#social-class/domain/repository/i_social_class_repository';
import ISocialClassEconomicalSituationPerTurnRepository
  from '#social-class/domain/repository/i_social_class_economical_situation_per_turn_repository';
import IGetSocialClassOfGameQueryHandler
  from '#social-class/application/queries/i_get_social_class_of_game_query_handler';

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
  }
}
