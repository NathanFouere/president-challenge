import type GetSocialClassByGameAndTypeQuery
  from '#social-class/application/queries/get_social_class_by_game_and_type_query';
import type SocialClass from '#social-class/domain/models/social_class';

export default abstract class IGetSocialClassByGameAndTypeQueryHandler {
  public abstract handle(query: GetSocialClassByGameAndTypeQuery): Promise<SocialClass>;
  public abstract handleForLawEffects(query: GetSocialClassByGameAndTypeQuery): Promise<SocialClass>;
}
