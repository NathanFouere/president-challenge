import type GetSocialClassesByGameAndTypeQuery
  from '#social-class/application/queries/get_social_classes_by_game_and_type_query';
import type SocialClass from '#social-class/domain/models/social_class';

export default abstract class IGetSocialClassesByGameAndTypeQueryHandler {
  public abstract handle(query: GetSocialClassesByGameAndTypeQuery): Promise<SocialClass[]>;
  public abstract handleForLawEffects(query: GetSocialClassesByGameAndTypeQuery): Promise<SocialClass[]>;
}
