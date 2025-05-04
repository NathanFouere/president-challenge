import type PoliticalPartySeatsParliamentDefinition
  from '#legislature/domain/models/political_party_seats_parliament_definition';
import type GetPoliticalPartySeatsParliamentDefinitionsByGameDefinitionQuery
  from '#legislature/application/query/get_political_party_seats_parliament_definitions_by_game_definition_query';

export default abstract class IGetPoliticalPartySeatsParliamentDefinitionsByGameDefinitionQueryHandler {
  public abstract handle(
    query: GetPoliticalPartySeatsParliamentDefinitionsByGameDefinitionQuery,
  ): Promise<PoliticalPartySeatsParliamentDefinition[]>;
}
