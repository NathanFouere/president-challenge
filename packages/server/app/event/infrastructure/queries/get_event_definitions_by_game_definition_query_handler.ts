import type IGetEventDefinitionsByGameDefinitionQueryHandler
  from '#event/application/queries/i_get_event_definitions_by_game_definition_query_handler';
import type GetEventDefinitionsByGameDefinitionQuery
  from '#event/application/queries/get_event_definitions_by_game_definition_query';
import EventDefinition from '#event/domain/models/event_definition';

export default class GetEventDefinitionsByGameDefinitionQueryHandler implements IGetEventDefinitionsByGameDefinitionQueryHandler {
  public async handle(query: GetEventDefinitionsByGameDefinitionQuery): Promise<EventDefinition[]> {
    return await EventDefinition
      .query()
      .where('gameDefinitionIdentifier', query.gameDefinitionIdentifier)
      .exec();
  }
}
