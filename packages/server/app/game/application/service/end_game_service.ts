import { inject } from '@adonisjs/core';
import type { TurnProcessorStep } from '#game/application/service/turn-service/turn_processor_step';
import type { TurnDataContext } from '#game/application/service/turn-service/load_turn_data_context_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import GameEndEventGenerationService from '#game/application/service/game_end_event_generation_service';

@inject()
export default class EndGameService implements TurnProcessorStep {
  constructor(
    private readonly gameEndEventGenerationService: GameEndEventGenerationService,
  ) {
  }

  public async execute(context: TurnDataContext): Promise<void> {
    if (!context.game.isInFinishedStatus()) {
      return;
    }

    await this.gameEndEventGenerationService.createEventFromGameEnding(context.game);
  }
}
