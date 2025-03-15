import type { GameStatus } from '@president-challenge/shared/game/game_status.js';
export interface MinimalGameDto {
    id: number;
    turn: number;
    status: GameStatus;
}
