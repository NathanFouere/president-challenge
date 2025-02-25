import type IGetSocialClassesByGameAndTypeQueryHandler
  from '#social-class/application/queries/i_get_social_classes_by_game_and_type_query_handler';
import type GetSocialClassesByGameAndTypeQuery
  from '#social-class/application/queries/get_social_classes_by_game_and_type_query';
import SocialClass from '#social-class/domain/models/social_class';

export default class GetSocialClassesByGameAndTypeQueryHandler implements IGetSocialClassesByGameAndTypeQueryHandler {
  public async handle(query: GetSocialClassesByGameAndTypeQuery): Promise<SocialClass[]> {
    return await SocialClass.query()
      .where('game_id', query.gameId)
      .whereHas('definition', (definitionQuery) => {
        definitionQuery.where('type', query.socialClassType);
      })
      .preload('definition')
      .exec();
  }

  public async handleForLawEffects(query: GetSocialClassesByGameAndTypeQuery): Promise<SocialClass[]> {
    return await SocialClass.query()
      .where('game_id', query.gameId)
      .whereHas('definition', (definitionQuery) => {
        definitionQuery.where('type', query.socialClassType);
      })
      .preload('definition')
      .preload('happinessModifiers')
      .exec();
  }
}
