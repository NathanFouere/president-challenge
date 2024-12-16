import type { GetSocialClassesOfGameQuery } from '#social-class/application/queries/get_social_classes_of_game_query';
import SocialClass from '#social-class/domain/models/social_class';

export class GetSocialClassesOfGameQueryHandler {
  public async handle(query: GetSocialClassesOfGameQuery): Promise<SocialClass[]> {
    return SocialClass
      .query()
      .where('game_id', query.gameId)
      .preload('licensedFiles')
      .exec();
  }
}
