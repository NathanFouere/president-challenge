import SocialClass from '#social-class/domain/models/social_class';
import type { GetSocialClassOfGameQuery } from '#social-class/application/queries/get_social_class_of_game_query';

export class GetSocialClassOfGameQueryHandler {
  public async handle(query: GetSocialClassOfGameQuery): Promise<SocialClass> {
    return await SocialClass
      .query()
      .where('game_id', query.gameId)
      .where('id', query.socialClassId)
      .preload('licensedFiles')
      .firstOrFail();
  }
}
