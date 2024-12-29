import AppProvider from '#common/provider';
import IGetGameOfUserQueryHandler from '#game/application/queries/i_get_game_of_user_query_handler';
import IGameRepository from '#game/domain/repository/i_game_repository';
import IGetUserGamesQueryHandler from '#game/application/queries/i_get_user_games_query_handler';

export default class GameProvider extends AppProvider {
  public async boot() {
    const { default: GetGameOfUserQueryHandler } = await import(
      '#game/infrastructure/query/get_game_of_user_query_handler'
    );
    const { default: GameRepository } = await import(
      '#game/infrastructure/repositories/game_repository'
    );
    const { default: GetUserGamesQueryHandler } = await import(
      '#game/infrastructure/query/get_user_games_query_handler'
    );

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
