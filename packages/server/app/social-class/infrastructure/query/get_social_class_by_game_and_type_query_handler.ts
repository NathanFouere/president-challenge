import type IGetSocialClassByGameAndTypeQueryHandler
  from '#social-class/application/queries/i_get_social_class_by_game_and_type_query_handler';
import type GetSocialClassByGameAndTypeQuery
  from '#social-class/application/queries/get_social_class_by_game_and_type_query';
import SocialClass from '#social-class/domain/models/social_class';

export default class GetSocialClassByGameAndTypeQueryHandler implements IGetSocialClassByGameAndTypeQueryHandler {
  public async handle(query: GetSocialClassByGameAndTypeQuery): Promise<SocialClass> {
    return await SocialClass.query()
      .where('game_id', query.gameId)
      .whereHas('definition', (definitionQuery) => {
        definitionQuery.where('type', query.socialClassType);
      })
      .preload('definition')
      .firstOrFail();
  }

  public async handleForLawEffects(query: GetSocialClassByGameAndTypeQuery): Promise<SocialClass> {
    return await SocialClass.query()
      .where('game_id', query.gameId)
      .whereHas('definition', (definitionQuery) => {
        definitionQuery.where('type', query.socialClassType);
      })
      .preload('definition')
      .preload('happinessModifiers')
      .firstOrFail();
  }
}
