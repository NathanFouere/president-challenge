import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import GameRepository from '#game/infrastructure/repositories/game_repository';
import type Game from '#game/domain/models/game';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { StateRevenuePerTurnSaveService } from '#state/application/service/state_economical_situation_per_turn_save_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { GetStateOfGameQueryHandler } from '#state/application/query/get_state_of_game_query_handler';
import { GetStateOfGameQuery } from '#state/application/query/get_state_of_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  SectorEconomicalSituationPerTurnSaveService,
} from '#sector/application/service/sector_economical_situation_per_turn_save_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { GetSectorsByGameQueryHandler } from '#sector/application/query/get_sectors_by_game_query_handler';
import { GetSectorsByGameQuery } from '#sector/application/query/get_sectors_by_game_query';

@inject()
export default class ChangeTurnService {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly getStateOfGameQueryHandler: GetStateOfGameQueryHandler,
    private readonly stateRevenuePerTurnSaveService: StateRevenuePerTurnSaveService,
    private readonly sectorEconomicalSituationPerTurnSaveService: SectorEconomicalSituationPerTurnSaveService,
    private readonly getSectorsOfGameQueryHandler: GetSectorsByGameQueryHandler,
  ) {
  }

  public async changeTurn(game: Game): Promise<Game> {
    try {
      game.changeTurn();
      const newTurn = game.turn;
      const state = await this.getStateOfGameQueryHandler.handle(new GetStateOfGameQuery(
        game.id,
      ));
      const sectors = await this.getSectorsOfGameQueryHandler.handle(new GetSectorsByGameQuery(
        game.id,
      ));
      await this.stateRevenuePerTurnSaveService.saveStateEconomicalSituationForMonth(state, newTurn);
      await this.sectorEconomicalSituationPerTurnSaveService.saveSectorsEconomicalSituationForTurn(sectors, newTurn);
      await this.gameRepository.save(game);
    }
    catch (e) {
      console.error(e);
    }
    return game;
  }
}
