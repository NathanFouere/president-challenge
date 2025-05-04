import type GameDefinition from '#game/domain/models/game_definition';
import type GetGameDefinitionsQuery from '#game/application/queries/get_game_definitions_query';

export default abstract class IGetGameDefinitionsQueryHandler {
  public abstract handle(query: GetGameDefinitionsQuery): Promise<GameDefinition[]>;
  public abstract handleForDisplay(query: GetGameDefinitionsQuery): Promise<GameDefinition[]>;
}
