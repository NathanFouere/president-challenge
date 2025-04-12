import AppProvider from '#common/provider';
import IGetGameOfUserQueryHandler from '#game/application/queries/i_get_game_of_user_query_handler';
import IGameRepository from '#game/domain/repository/i_game_repository';
import IGetUserGamesQueryHandler from '#game/application/queries/i_get_user_games_query_handler';
import IGameDefinitionRepository from '#game/domain/repository/i_game_definition_repository';
import IGetGameDefinitionsQueryHandler from '#game/application/queries/i_get_game_definitions_query_handler';

export default class GameProvider extends AppProvider {
  public async boot() {
    const { default: GetGameOfUserQueryHandler } = await import(
      '#game/infrastructure/query/get_game_of_user_query_handler'
    );
    const { default: GameRepository } = await import(
      '#game/infrastructure/repository/game_repository'
    );
    const { default: GetUserGamesQueryHandler } = await import(
      '#game/infrastructure/query/get_user_games_query_handler'
    );
    const { default: GameDefinitionRepository } = await import(
      '#game/infrastructure/repository/game_definition_repository'
    );
    const { default: GetGameDefinitionsQueryHandler } = await import(
      '#game/infrastructure/query/get_game_definitions_query_handler'
    );

    this.app.container.bind(IGetGameDefinitionsQueryHandler, () => {
      return new GetGameDefinitionsQueryHandler();
    });
    this.app.container.bind(IGameDefinitionRepository, () => {
      return new GameDefinitionRepository();
    });
    this.app.container.bind(IGetGameOfUserQueryHandler, () => {
      return new GetGameOfUserQueryHandler();
    });
    this.app.container.bind(IGameRepository, () => {
      return new GameRepository();
    });
    this.app.container.bind(IGetUserGamesQueryHandler, () => {
      return new GetUserGamesQueryHandler();
    });
  }
}
