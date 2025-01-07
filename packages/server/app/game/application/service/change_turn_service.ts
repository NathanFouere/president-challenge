import { inject } from '@adonisjs/core';

import type Game from '#game/domain/models/game';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LoadTurnDataContextService } from '#game/application/service/turn-service/load_turn_data_context_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import TurnPipelineFactory from '#game/application/service/turn-service/turn_pipeline_factory';

@inject()
export default class ChangeTurnService {
  constructor(
    private readonly turnCacheService: LoadTurnDataContextService,
    private readonly turnPipelineFactory: TurnPipelineFactory,
  ) {
  }

  public async changeTurn(game: Game): Promise<Game> {
    try {
      game.changeTurn();
      const turnDataCache = await this.turnCacheService.load(game);
      const turnPipeline = this.turnPipelineFactory.createPipeline(turnDataCache);
      await turnPipeline.executeWithTurnContext();
    }
    catch (e) {
      console.error(e);
    }
    return game;
  }
}
