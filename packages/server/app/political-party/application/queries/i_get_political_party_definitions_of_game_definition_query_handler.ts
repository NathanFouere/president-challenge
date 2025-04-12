import type GetPoliticalPartyDefinitionsOfGameDefinitionQuery
  from '#political-party/application/queries/get_political_party_definitions_of_game_definition_query';
import type PoliticalPartyDefinition from '#political-party/domain/models/political_party_definition';

export default abstract class IGetPoliticalPartyDefinitionsOfGameDefinitionQueryHandler {
  public abstract handle(getPoliticalPartyDefinitionsOfGameDefinitionQuery: GetPoliticalPartyDefinitionsOfGameDefinitionQuery): Promise<PoliticalPartyDefinition[]>;
}
