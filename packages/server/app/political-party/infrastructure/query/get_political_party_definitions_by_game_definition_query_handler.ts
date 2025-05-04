import type IGetPoliticalPartyDefinitionsByGameDefinitionQueryHandler
  from '#political-party/application/queries/i_get_political_party_definitions_by_game_definition_query_handler';
import type GetPoliticalPartyDefinitionsByGameDefinitionQuery
  from '#political-party/application/queries/get_political_party_definitions_by_game_definition_query';
import PoliticalPartyDefinition from '#political-party/domain/models/political_party_definition';

export default class GetPoliticalPartyDefinitionsByGameDefinitionQueryHandler implements IGetPoliticalPartyDefinitionsByGameDefinitionQueryHandler {
  public async handle(getPoliticalPartyDefinitionsOfGameDefinitionQuery: GetPoliticalPartyDefinitionsByGameDefinitionQuery): Promise<PoliticalPartyDefinition[]> {
    return PoliticalPartyDefinition
      .query()
      .where('gameDefinitionIdentifier', getPoliticalPartyDefinitionsOfGameDefinitionQuery.gameDefinitionIdentifier)
      .exec();
  }
}
