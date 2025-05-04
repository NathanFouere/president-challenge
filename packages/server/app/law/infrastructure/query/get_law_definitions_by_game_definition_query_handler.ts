import type IGetLawDefinitionsByGameDefinitionQueryHandler
  from '#law/application/query/i_get_law_definitions_by_game_definition_query_handler';
import type GetLawDefinitionsByGameDefinitionQuery from '#law/application/query/get_law_definitions_by_game_definition_query';
import LawDefinition from '#law/domain/model/law_definition';

export default class GetLawDefinitionsByGameDefinitionQueryHandler implements IGetLawDefinitionsByGameDefinitionQueryHandler {
  public async handle(query: GetLawDefinitionsByGameDefinitionQuery): Promise<LawDefinition[]> {
    return await LawDefinition
      .query()
      .where('gameDefinitionIdentifier', query.gameDefinitionIdentifier)
      .exec();
  }
}
