import type { MinimalGameDto } from '@shared/dist/game/minimal-game-dto.js';
import type Game from '#game/domain/models/game';

export default class MinimalGameDtoFactory {
  public createFromGame(game: Game): MinimalGameDto {
    return {
      id: game.id,
      turn: game.turn,
      status: game.status,
    };
  }

  public createFromGames(games: Game[]): MinimalGameDto[] {
    return games.map((game: Game) => this.createFromGame(game));
  }
}
