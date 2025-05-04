import type IGetGameDefinitionsQueryHandler from '#game/application/queries/i_get_game_definitions_query_handler';
import type GetGameDefinitionsQuery from '#game/application/queries/get_game_definitions_query';
import GameDefinition from '#game/domain/models/game_definition';

export default class GetGameDefinitionsQueryHandler implements IGetGameDefinitionsQueryHandler {
  public async handle(_query: GetGameDefinitionsQuery): Promise<GameDefinition[]> {
    return await GameDefinition.all();
  }

  public async handleForDisplay(_query: GetGameDefinitionsQuery): Promise<GameDefinition[]> {
    return await GameDefinition.query().preload('logo').orderBy('in_development', 'asc').exec();
  }
}
