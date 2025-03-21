import type GetSenateDefinitionQuery from '#legislature/application/query/get_senate_definition_query';
import type IGetSenateDefinitionQueryHandler from '#legislature/application/query/i_get_senate_definition_query_handler';
import SenateDefinition from '#legislature/domain/models/senate_definition';

export default class GetSenateDefinitionQueryHandler implements IGetSenateDefinitionQueryHandler {
  public async handle(_query: GetSenateDefinitionQuery): Promise<SenateDefinition> {
    return await SenateDefinition.firstOrFail();
  }
}
