import { inject } from '@adonisjs/core';

import type Game from '#game/domain/models/game';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ProductPriceRandomizerService } from '#product/domain/service/product_price_randomizer_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SectorEconomicalSituationCalculatorService
  from '#sector/domain/service/sector_economical_situation_calculator_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SaveTurnService from '#game/application/service/save_turn_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LoadTurnService } from '#game/application/service/load_turn_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import HappinessModifierTurnGestionService from '#happiness-modifier/application/service/happiness_modifier_turn_gestion_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassHappinessService from '#social-class/domain/service/social_class_happiness_service';

@inject()
export default class ChangeTurnService {
  constructor(
    private readonly sectorEconomicalSituationCalculatorService: SectorEconomicalSituationCalculatorService,
    private readonly productChangePriceTurnService: ProductPriceRandomizerService,
    private readonly saveTurnService: SaveTurnService,
    private readonly loadTurnService: LoadTurnService,
    private readonly happinessModifierTurnGestionService: HappinessModifierTurnGestionService,
    private readonly socialClassHappinessService: SocialClassHappinessService,
  ) {
  }

  public async changeTurn(game: Game): Promise<Game> {
    try {
      game.changeTurn();
      const newTurn = game.turn;
      const loadTurnData = await this.loadTurnService.loadTurn(game.id);
      await this.sectorEconomicalSituationCalculatorService.setSectorsEconomicalSituation(loadTurnData.sectors, loadTurnData.state);
      await this.productChangePriceTurnService.changeProductsPricesRandomly(loadTurnData.products);
      await this.happinessModifierTurnGestionService.processHappinessModifiersOfGame(game.id);
      this.socialClassHappinessService.updateSocialClassesHappiness(loadTurnData.socialClasses);
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
