import type IGetChoiceDefinitionsByGameDefinitionQueryHandler
  from '#event/application/queries/i_get_choice_definitions_by_game_definition_query_handler';
import ChoiceDefinition from '#event/domain/models/choice_definition';
import type GetChoiceDefinitionsByGameDefinitionQuery
  from '#event/application/queries/get_choice_definitions_by_game_definition_query';

export default class GetChoiceDefinitionsByGameDefinitionQueryHandler implements IGetChoiceDefinitionsByGameDefinitionQueryHandler {
  public async handle(query: GetChoiceDefinitionsByGameDefinitionQuery): Promise<ChoiceDefinition[]> {
    return await ChoiceDefinition
      .query()
      .where('gameDefinitionIdentifier', query.gameDefinitionIdentifier)
      .exec();
  }
}
