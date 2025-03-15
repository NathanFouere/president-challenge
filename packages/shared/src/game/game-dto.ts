import type { GameStatus } from '@president-challenge/shared/game/game_status.js';

export interface GameDto {
  id: number;
  turn: number;
  politicalWeight: number;
  maxTurns: number;
  status: GameStatus;
}
