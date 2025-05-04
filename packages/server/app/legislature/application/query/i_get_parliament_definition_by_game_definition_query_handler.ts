import type GetParliamentDefinitionByGameDefinitionQuery from '#legislature/application/query/get_parliament_definition_by_game_definition_query';
import type ParliamentDefinition from '#legislature/domain/models/parliament_definition';

export default abstract class IGetParliamentDefinitionByGameDefinitionQueryHandler {
  public abstract handle(query: GetParliamentDefinitionByGameDefinitionQuery): Promise<ParliamentDefinition>;
}
