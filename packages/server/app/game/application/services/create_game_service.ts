import { inject } from '@adonisjs/core';
import type User from '#user/domain/models/user';
import { aGame } from '#game/application/builders/game_builder';
import type Game from '#game/domain/models/game';

@inject()
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

    const game = aGame()
      .withUserId(user.id)
      .withTurnNumber(0)
      .build();

    await game.save();

    return game;
  }
}
