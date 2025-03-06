import type GetParliamentDefinitionQuery from '#legislature/application/query/get_parliament_definition_query';
import type IGetParliamentDefinitionQueryHandler
  from '#legislature/application/query/i_get_parliament_definition_query_handler';
import ParliamentDefinition from '#legislature/domain/models/parliament_definition';

export default class GetParliamentDefinitionQueryHandler implements IGetParliamentDefinitionQueryHandler {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async handle(query: GetParliamentDefinitionQuery): Promise<ParliamentDefinition> {
    return await ParliamentDefinition.firstOrFail();
  }
}
