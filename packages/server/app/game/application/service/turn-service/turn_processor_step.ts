import type { GameTurnProcessStreamData } from '@president-challenge/shared/dist/game/game-turn-process-stream-data.js';

import type { TurnDataContext } from '#game/application/service/turn-service/load_turn_data_context_service';

export abstract class TurnProcessorStep {
  public abstract execute(context: TurnDataContext, gameTurnProcessStreamContainer: GameTurnProcessStreamData): Promise<void>;
}
