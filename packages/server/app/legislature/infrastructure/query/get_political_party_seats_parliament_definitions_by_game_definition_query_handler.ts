import PoliticalPartySeatsParliamentDefinition from '#legislature/domain/models/political_party_seats_parliament_definition';
import type GetPoliticalPartySeatsParliamentDefinitionsByGameDefinitionQuery
  from '#legislature/application/query/get_political_party_seats_parliament_definitions_by_game_definition_query';
import type IGetPoliticalPartySeatsParliamentDefinitionsByGameDefinitionQueryHandler
  from '#legislature/application/query/i_get_political_party_seats_parliament_definitions_by_game_definition_query_handler';

export default class GetPoliticalPartySeatsParliamentDefinitionsByGameDefinitionQueryHandler implements IGetPoliticalPartySeatsParliamentDefinitionsByGameDefinitionQueryHandler {
  public async handle(
    query: GetPoliticalPartySeatsParliamentDefinitionsByGameDefinitionQuery,
  ): Promise<PoliticalPartySeatsParliamentDefinition[]> {
    return await PoliticalPartySeatsParliamentDefinition
      .query()
      .where('gameDefinitionIdentifier', query.gameDefinitionIdentifier)
      .exec();
  }
}
