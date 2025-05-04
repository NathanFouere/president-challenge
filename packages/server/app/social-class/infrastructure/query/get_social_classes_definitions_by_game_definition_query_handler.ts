import SocialClassDefinition from '#social-class/domain/models/social_class_definition';
import type GetSocialClassesDefinitionsByGameDefinitionQuery
  from '#social-class/application/queries/get_social_classes_definitions_by_game_definition_query';

export default class GetSocialClassesDefinitionsByGameDefinitionQueryHandler {
  public async handle(query: GetSocialClassesDefinitionsByGameDefinitionQuery): Promise<SocialClassDefinition[]> {
    return await SocialClassDefinition
      .query()
      .where('gameDefinitionIdentifier', query.gameDefinitionIdentifier)
      .exec();
  }
}
