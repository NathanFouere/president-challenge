import PoliticalPartySeatsSenateDefinition from '#legislature/domain/models/political_party_seats_senate_definition';
import type GetPoliticalPartySeatsSenateDefinitionsByGameDefinitionQuery
  from '#legislature/application/query/get_political_party_seats_senate_definitions_by_game_definition_query';
import type IGetPoliticalPartySeatsSenateDefinitionsByGameDefinitionQueryHandler
  from '#legislature/application/query/i_get_political_party_seats_senate_definitions_by_game_definition_query_handler';

export default class GetPoliticalPartySeatsSenateDefinitionsByGameDefinitionQueryHandler implements IGetPoliticalPartySeatsSenateDefinitionsByGameDefinitionQueryHandler {
  public async handle(
    query: GetPoliticalPartySeatsSenateDefinitionsByGameDefinitionQuery,
  ): Promise<PoliticalPartySeatsSenateDefinition[]> {
    return await PoliticalPartySeatsSenateDefinition
      .query()
      .where('gameDefinitionIdentifier', query.gameDefinitionIdentifier)
      .exec();
  }
}
