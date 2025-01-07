import { inject } from '@adonisjs/core';

import type Game from '#game/domain/models/game';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SaveTurnService from '#game/application/service/turn-service/save_turn_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LoadTurnService } from '#game/application/service/turn-service/load_turn_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import TurnEconomicalService from '#game/application/service/turn-service/turn_economical_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import TurnHappinessService from '#game/application/service/turn-service/turn_happiness_service';

@inject()
export default class ChangeTurnService {
  constructor(
    private readonly saveTurnService: SaveTurnService,
    private readonly loadTurnService: LoadTurnService,
    private readonly turnEconomicalService: TurnEconomicalService,
    private readonly turnHappinessService: TurnHappinessService,
  ) {
  }

  public async changeTurn(game: Game): Promise<Game> {
    try {
      game.changeTurn();
      const newTurn = game.turn;
      const loadTurnData = await this.loadTurnService.loadTurn(game);
      await this.turnEconomicalService.passTurn(loadTurnData);
      await this.turnHappinessService.passTurn(loadTurnData);
      await this.saveTurnService.saveForTurn(
        game,
        loadTurnData.socialClasses,
        loadTurnData.politicalParties,
        loadTurnData.products,
        loadTurnData.sectors,
        loadTurnData.state,
        newTurn,
      );
    }
    catch (e) {
      console.error(e);
    }
    return game;
  }
}
