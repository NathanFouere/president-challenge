import SocialClass from '#social-class/domain/models/social_class';
import type { GetSocialClassOfGameQuery } from '#social-class/application/queries/get_social_class_of_game_query';
import type IGetSocialClassOfGameQueryHandler
  from '#social-class/application/queries/i_get_social_class_of_game_query_handler';

export default class GetSocialClassOfGameQueryHandler implements IGetSocialClassOfGameQueryHandler {
  private async getSocialClassOfGame(
    query: GetSocialClassOfGameQuery,
    preloadOptions: { licensedFiles?: boolean; economicalSituationPerTurn?: boolean } = {},
  ): Promise<SocialClass> {
    const queryBuilder = SocialClass
      .query()
      .where('game_id', query.gameId)
      .where('id', query.socialClassId);

    if (preloadOptions.economicalSituationPerTurn) {
      queryBuilder.preload('economicalSituationPerTurn');
    }

    if (preloadOptions.licensedFiles) {
      queryBuilder.preload('licensedFiles');
    }

    return queryBuilder.firstOrFail();
  }

  public async handle(query: GetSocialClassOfGameQuery): Promise<SocialClass> {
    return await this.getSocialClassOfGame(query, {
      economicalSituationPerTurn: true,
    });
  }

  public async handleForDisplay(query: GetSocialClassOfGameQuery): Promise<SocialClass> {
    return await this.getSocialClassOfGame(query, {
      licensedFiles: true,
      economicalSituationPerTurn: true,
    });
  }
}
