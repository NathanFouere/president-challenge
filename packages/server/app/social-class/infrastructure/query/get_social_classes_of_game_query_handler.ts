import type { GetSocialClassesOfGameQuery } from '#social-class/application/queries/get_social_classes_of_game_query';
import SocialClass from '#social-class/domain/models/social_class';
import type IGetSocialClassesOfGameQueryHandler
  from '#social-class/application/queries/i_get_social_classes_of_game_query_handler';

export default class GetSocialClassesOfGameQueryHandler implements IGetSocialClassesOfGameQueryHandler {
  private async getSocialClassesOfGame(
    query: GetSocialClassesOfGameQuery,
    preloadOptions: { licensedFiles?: boolean; economicalSituationPerTurn?: boolean } = {},
  ): Promise<SocialClass[]> {
    const queryBuilder = SocialClass.query().where('game_id', query.gameId);

    if (preloadOptions.economicalSituationPerTurn) {
      queryBuilder.preload('economicalSituationPerTurn');
    }

    if (preloadOptions.licensedFiles) {
      queryBuilder.preload('licensedFiles');
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
      licensedFiles: true,
    });
  }
}
