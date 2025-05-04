import type PoliticalPartySeatsSenateDefinition from '#legislature/domain/models/political_party_seats_senate_definition';
import type GetPoliticalPartySeatsSenateDefinitionsByGameDefinitionQuery
  from '#legislature/application/query/get_political_party_seats_senate_definitions_by_game_definition_query';

export default abstract class IGetPoliticalPartySeatsSenateDefinitionsByGameDefinitionQueryHandler {
  public abstract handle(
    query: GetPoliticalPartySeatsSenateDefinitionsByGameDefinitionQuery,
  ): Promise<PoliticalPartySeatsSenateDefinition[]>;
}
