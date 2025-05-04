import type GetLawDefinitionsByGameDefinitionQuery from '#law/application/query/get_law_definitions_by_game_definition_query';
import type LawDefinition from '#law/domain/model/law_definition';

export default abstract class IGetLawDefinitionsByGameDefinitionQueryHandler {
  public abstract handle(query: GetLawDefinitionsByGameDefinitionQuery): Promise<LawDefinition[]>;
}
