import type { GameTurnProcessStreamData } from '@president-challenge/shared/dist/game/game-turn-process-stream-data.js';

import type { TurnProcessorStep } from '#game/application/service/turn-service/turn_processor_step';
import type { TurnDataContext } from '#game/application/service/turn-service/load_turn_data_context_service';

export class TurnPipeline {
  constructor(
    private readonly steps: TurnProcessorStep[],
    private readonly turnContext: TurnDataContext,
    private readonly gameTurnProcessStreamContainer: GameTurnProcessStreamData,
  ) {
  }

  public async execute(): Promise<void> {
    for (const step of this.steps) {
      await step.execute(this.turnContext, this.gameTurnProcessStreamContainer);
    }
  }
}
