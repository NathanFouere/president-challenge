import type SocialClass from '#social-class/domain/models/social_class';
import type { GetSocialClassOfGameQuery } from '#social-class/application/queries/get_social_class_of_game_query';

export default abstract class IGetSocialClassOfGameQueryHandler {
  public abstract handle(query: GetSocialClassOfGameQuery): Promise<SocialClass>;
  public abstract handleForDisplay(query: GetSocialClassOfGameQuery): Promise<SocialClass>;
}
