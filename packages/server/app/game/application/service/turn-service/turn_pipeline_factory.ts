import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SaveTurnService from '#game/application/service/turn-service/save_turn_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import TurnEconomicalService from '#game/application/service/turn-service/turn_economical_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import TurnHappinessService from '#game/application/service/turn-service/turn_happiness_service';
import { TurnPipeline } from '#game/application/service/turn-service/turn_pipeline';
import type { TurnDataContext } from '#game/application/service/turn-service/load_turn_data_context_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import TurnPoliticalService from '#game/application/service/turn-service/turn_political_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import GameDefeatService from '#game/application/service/turn-service/game_defeat_service';

@inject()
export default class TurnPipelineFactory {
  constructor(
    private readonly saveTurnService: SaveTurnService,
    private readonly turnEconomicalService: TurnEconomicalService,
    private readonly turnPoliticalService: TurnPoliticalService,
    private readonly turnHappinessService: TurnHappinessService,
    private readonly gameDefeatService: GameDefeatService,
  ) {
  }

  public createPipeline(turnContext: TurnDataContext): TurnPipeline {
    return new TurnPipeline(
      [
        this.turnEconomicalService,
        this.turnHappinessService,
        this.turnPoliticalService,
        this.gameDefeatService,
        this.saveTurnService,
      ],
      turnContext,
    );
  }
}
