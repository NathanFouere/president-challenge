import type GetPoliticalPartyDefinitionsByGameDefinitionQuery
  from '#political-party/application/queries/get_political_party_definitions_by_game_definition_query';
import type PoliticalPartyDefinition from '#political-party/domain/models/political_party_definition';

export default abstract class IGetPoliticalPartyDefinitionsByGameDefinitionQueryHandler {
  public abstract handle(getPoliticalPartyDefinitionsOfGameDefinitionQuery: GetPoliticalPartyDefinitionsByGameDefinitionQuery): Promise<PoliticalPartyDefinition[]>;
}
