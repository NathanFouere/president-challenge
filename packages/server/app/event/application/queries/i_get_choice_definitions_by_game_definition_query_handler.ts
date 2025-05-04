import type GetChoiceDefinitionsByGameDefinitionQuery
  from '#event/application/queries/get_choice_definitions_by_game_definition_query';
import type ChoiceDefinition from '#event/domain/models/choice_definition';

export default abstract class IGetChoiceDefinitionsByGameDefinitionQueryHandler {
  public abstract handle(query: GetChoiceDefinitionsByGameDefinitionQuery): Promise<ChoiceDefinition[]>;
}
