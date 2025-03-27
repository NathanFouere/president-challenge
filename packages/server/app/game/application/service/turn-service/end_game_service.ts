import { inject } from '@adonisjs/core';
import type { GameTurnProcessStreamData } from '@president-challenge/shared/dist/game/game-turn-process-stream-data.js';

import { TurnProcessorStep } from '#game/application/service/turn-service/turn_processor_step';
import type { TurnDataContext } from '#game/application/service/turn-service/load_turn_data_context_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import GameEndEventGenerationService from '#game/application/service/game_end_event_generation_service';

@inject()
export default class EndGameService extends TurnProcessorStep {
  constructor(
    private readonly gameEndEventGenerationService: GameEndEventGenerationService,
  ) {
    super();
  }

  public async execute(context: TurnDataContext, gameTurnProcessStreamContainer: GameTurnProcessStreamData): Promise<void> {
    gameTurnProcessStreamContainer.message = 'Processing end game';
    if (!context.game.isInFinishedStatus()) {
      return;
    }

    await this.gameEndEventGenerationService.createEventFromGameEnding(context.game);
  }
}
