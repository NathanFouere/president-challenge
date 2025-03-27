import { inject } from '@adonisjs/core';

import type { GameTurnProcessStreamData } from '@president-challenge/shared/dist/game/game-turn-process-stream-data.js';
import type Game from '#game/domain/models/game';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LoadTurnDataContextService } from '#game/application/service/turn-service/load_turn_data_context_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import TurnPipelineFactory from '#game/application/service/turn-service/turn_pipeline_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import TurnResetService from '#game/application/service/turn-service/turn_reset_sercice';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import GameTurnProcessStreamService from '#game/infrastructure/stream/game_turn_process_stream_service';

@inject()
export default class ChangeTurnService {
  constructor(
    private readonly loadTurnDataContextService: LoadTurnDataContextService,
    private readonly turnPipelineFactory: TurnPipelineFactory,
    private readonly turnResetService: TurnResetService,
    private readonly gameTurnProcessStreamService: GameTurnProcessStreamService,
  ) {
  }

  public async changeTurn(game: Game): Promise<Game> {
    try {
      // TODO => faire de la refacto pour tout regrouper dans pipeline et bouger le gameTurnProcessStream
      const gameTurnProcessStreamData: GameTurnProcessStreamData = {
        message: 'Starting turn',
      };
      this.gameTurnProcessStreamService.createGameTurnProcessStream(game.id, gameTurnProcessStreamData);
      game.changeTurn();
      await this.turnResetService.execute(game.id, gameTurnProcessStreamData);
      const turnDataContext = await this.loadTurnDataContextService.load(game, gameTurnProcessStreamData);
      const turnPipeline = this.turnPipelineFactory.createPipelineForGame(turnDataContext, gameTurnProcessStreamData);
      await turnPipeline.execute();
      this.gameTurnProcessStreamService.deleteGameTurnProcessStream(game.id);
    }
    catch (e) {
      console.error(e);
    }
    return game;
  }
}
