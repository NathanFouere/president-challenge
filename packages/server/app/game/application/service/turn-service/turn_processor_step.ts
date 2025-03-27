import type { GameTurnProcessStreamData } from '@president-challenge/shared/dist/game/game-turn-process-stream-data.js';

import type { TurnDataContext } from '#game/application/service/turn-service/load_turn_data_context_service';

export abstract class TurnProcessorStep {
  constructor(
    public readonly description: string,
  ) {
  }

  public abstract execute(context: TurnDataContext, gameTurnProcessStreamContainer: GameTurnProcessStreamData): Promise<void>;
  public updateStreamData(gameTurnProcessStreamContainer: GameTurnProcessStreamData): void {
    gameTurnProcessStreamContainer.message = this.description;
  }
}
