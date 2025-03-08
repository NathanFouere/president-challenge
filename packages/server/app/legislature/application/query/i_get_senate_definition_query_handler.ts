import type GetSenateDefinitionQuery from '#legislature/application/query/get_senate_definition_query';
import type SenateDefinition from '#legislature/domain/models/senate_definition';

export default abstract class IGetSenateDefinitionQueryHandler {
  public abstract handle(query: GetSenateDefinitionQuery): Promise<SenateDefinition>;
}
