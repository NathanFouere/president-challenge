import type IGetPoliticalPartyDefinitionsOfGameDefinitionQueryHandler
  from '#political-party/application/queries/i_get_political_party_definitions_of_game_definition_query_handler';
import type GetPoliticalPartyDefinitionsOfGameDefinitionQuery
  from '#political-party/application/queries/get_political_party_definitions_of_game_definition_query';
import type PoliticalPartyDefinition from '#political-party/domain/models/political_party_definition';

export default class GetPoliticalPartyDefinitionsOfGameDefinitionQueryHandler implements IGetPoliticalPartyDefinitionsOfGameDefinitionQueryHandler {
  public async handle(getPoliticalPartyDefinitionsOfGameDefinitionQuery: GetPoliticalPartyDefinitionsOfGameDefinitionQuery): Promise<PoliticalPartyDefinition[]> {
    return PoliticalPartyDefinition
      .query()
      .where('gameDefinitionIdentifier', getPoliticalPartyDefinitionsOfGameDefinitionQuery.gameDefinitionIdentifier)
      .exec();
  }
}
