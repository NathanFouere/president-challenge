import type { GetSocialClassesOfGameQuery } from '#social-class/application/queries/get_social_classes_of_game_query';
import SocialClass from '#social-class/domain/models/social_class';
import type IGetSocialClassesOfGameQueryHandler
  from '#social-class/application/queries/i_get_social_classes_of_game_query_handler';

export default class GetSocialClassesOfGameQueryHandler implements IGetSocialClassesOfGameQueryHandler {
  private async getSocialClassesOfGame(
    query: GetSocialClassesOfGameQuery,
    preloadOptions: { economicalSituationPerTurn?: boolean; happinessModifiers?: boolean; definition?: boolean } = {},
  ): Promise<SocialClass[]> {
    const queryBuilder = SocialClass.query().where('game_id', query.gameId);

    if (preloadOptions.economicalSituationPerTurn) {
      queryBuilder.preload('economicalSituationPerTurn');
    }

    if (preloadOptions.happinessModifiers) {
      queryBuilder.preload('happinessModifiers');
    }

    if (preloadOptions.definition) {
      queryBuilder.preload('definition', (definitionQuery) => {
        definitionQuery.preload('licensedFiles');
      });
    }

    return queryBuilder.exec();
  }

  public async handle(query: GetSocialClassesOfGameQuery): Promise<SocialClass[]> {
    return await this.getSocialClassesOfGame(query, {
      economicalSituationPerTurn: true,
    });
  }

  public async handleForDisplay(query: GetSocialClassesOfGameQuery): Promise<SocialClass[]> {
    return await this.getSocialClassesOfGame(query, {
      definition: true,
    });
  }

  public async handleForSwitchTurn(query: GetSocialClassesOfGameQuery): Promise<SocialClass[]> {
    return await this.getSocialClassesOfGame(query, {
      economicalSituationPerTurn: true,
      happinessModifiers: true,
      definition: true,
    });
  }
}
