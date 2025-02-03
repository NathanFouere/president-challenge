import type { GameDto } from '@shared/dist/game/game-dto.js';
import type Game from '#game/domain/models/game';

export default class GameDtoFactory {
  public createFromGame(game: Game): GameDto {
    return {
      id: game.id,
      turn: game.turn,
      politicalWeight: game.politicalWeight,
    };
  }
}
