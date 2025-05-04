import type SocialClassDefinition from '#social-class/domain/models/social_class_definition';
import type GetSocialClassesDefinitionsByGameDefinitionQuery
  from '#social-class/application/queries/get_social_classes_definitions_by_game_definition_query';

export default abstract class IGetSocialClassesDefinitionsByGameDefinitionQueryHandler {
  public abstract handle(query: GetSocialClassesDefinitionsByGameDefinitionQuery): Promise<SocialClassDefinition[]>;
}
