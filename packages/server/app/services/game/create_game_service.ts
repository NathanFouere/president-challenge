import Game from '#models/game/game';
import type User from '#models/auth/user';

export default class CreateGameService {
  public readonly MAX_GAMES = 3;

  public async canCreateGame(user: User): Promise<boolean> {
    await user.load('games');
    const numberOfGames = user.games.length;
    return Number((numberOfGames)) < this.MAX_GAMES;
  }

  public async createGame(user: User): Promise<Game> {
    const canCreateGame = await this.canCreateGame(user);
    if (!canCreateGame) {
      throw new Error(
        `User already has the maximum allowed number of games (${this.MAX_GAMES})`,
      );
    }

    // TODO => move to builder
    const game = new Game();
    game.userId = user.id;
    game.turnNumber = 0;
    await game.save();

    return game;
  }
}
