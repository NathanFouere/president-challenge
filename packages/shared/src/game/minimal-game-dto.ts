import type { GameStatus } from '@shared/game/game_status.js';

export interface MinimalGameDto {
  id: number;
  turn: number;
  status: GameStatus;
}
