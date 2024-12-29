import type { GetSocialClassesOfGameQuery } from '#social-class/application/queries/get_social_classes_of_game_query';
import type SocialClass from '#social-class/domain/models/social_class';

export default abstract class IGetSocialClassesOfGameQueryHandler {
  public abstract handle(query: GetSocialClassesOfGameQuery): Promise<SocialClass[]>;
  public abstract handleForDisplay(query: GetSocialClassesOfGameQuery): Promise<SocialClass[]>;
}
