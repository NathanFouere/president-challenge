import type GetParliamentDefinitionQuery from '#legislature/application/query/get_parliament_definition_query';
import type ParliamentDefinition from '#legislature/domain/models/parliament_definition';

export default abstract class IGetParliamentDefinitionQueryHandler {
  public abstract handle(query: GetParliamentDefinitionQuery): Promise<ParliamentDefinition>;
}
