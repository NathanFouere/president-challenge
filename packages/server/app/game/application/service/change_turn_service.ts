import { inject } from '@adonisjs/core';

import type Game from '#game/domain/models/game';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LoadTurnDataContextService } from '#game/application/service/turn-service/load_turn_data_context_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import TurnPipelineFactory from '#game/application/service/turn-service/turn_pipeline_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import TurnResetService from '#game/application/service/turn-service/turn_reset_sercice';

@inject()
export default class ChangeTurnService {
  constructor(
    private readonly loadTurnDataContextService: LoadTurnDataContextService,
    private readonly turnPipelineFactory: TurnPipelineFactory,
    private readonly turnResetService: TurnResetService,
  ) {
  }

  public async changeTurn(game: Game): Promise<Game> {
    try {
      game.changeTurn();
      await this.turnResetService.execute(game.id);
      const turnDataContext = await this.loadTurnDataContextService.load(game);
      const turnPipeline = this.turnPipelineFactory.createPipeline(turnDataContext);
      await turnPipeline.execute();
    }
    catch (e) {
      console.error(e);
    }
    return game;
  }
}
