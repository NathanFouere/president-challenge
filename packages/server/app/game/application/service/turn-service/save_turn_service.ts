import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGameRepository from '#game/domain/repository/i_game_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ProductRepository from '#product/infrastructure/repository/product_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SectorRepository from '#sector/infrastructure/repository/sector_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { StateRevenuePerTurnSaveService } from '#state/application/service/state_economical_situation_per_turn_save_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ProductPricePerTurnSaveService } from '#product/application/service/product_price_per_turn_save_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  SocialClassEconomicalSituationPerTurnSaveService,
} from '#social-class/application/service/social_class_economical_situation_per_turn_save_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  SectorEconomicalSituationPerTurnSaveService,
} from '#sector/application/service/sector_economical_situation_per_turn_save_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import StateRepository from '#state/infrastructure/repository/state_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  SocialClassHappinessPerTurnSaveService,
} from '#social-class/application/service/social_class_happiness_per_turn_save_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  PoliticalPartyHappinessPerTurnSaveService,
} from '#political-party/application/service/political_party_happiness_per_turn_save_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassSaveForTurnService from '#social-class/infrastructure/service/social_class_save_for_turn_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import PoliticalPartySaveForTurnService
  from '#political-party/infrastructure/service/political_party_save_for_turn_service';
import type { TurnDataContext } from '#game/application/service/turn-service/load_turn_data_context_service';
import type { TurnProcessorStep } from '#game/application/service/turn-service/turn_processor_step';

@inject()
export default class SaveTurnService implements TurnProcessorStep {
  constructor(
    private readonly gameRepository: IGameRepository,
    private readonly productRepository: ProductRepository,
    private readonly sectorRepository: SectorRepository,
    private readonly stateRevenuePerTurnSaveService: StateRevenuePerTurnSaveService,
    private readonly productPricePerTurnSaveService: ProductPricePerTurnSaveService,
    private readonly socialClassEconomicalSituationPerTurnSaveService: SocialClassEconomicalSituationPerTurnSaveService,
    private readonly sectorEconomicalSituationPerTurnSaveService: SectorEconomicalSituationPerTurnSaveService,
    private readonly socialClassHappinessPerTurnSaveService: SocialClassHappinessPerTurnSaveService,
    private readonly politicalPartyHappinessPerTurnSaveService: PoliticalPartyHappinessPerTurnSaveService,
    private readonly stateRepository: StateRepository,
    private readonly socialClassService: SocialClassSaveForTurnService,
    private readonly politicalPartySaveForTurnService: PoliticalPartySaveForTurnService,
  ) {

  }

  public async execute(turnDataContext: TurnDataContext): Promise<void> {
    await this.saveGlobalDatas(turnDataContext);
    await this.saveHistoricalDatas(turnDataContext);
  }

  private async saveGlobalDatas(turnDataContext: TurnDataContext): Promise<void> {
    await Promise.all([
      this.gameRepository.save(turnDataContext.game),
      this.stateRepository.save(turnDataContext.state),
      this.socialClassService.saveSocialClassesForTurn(turnDataContext.socialClasses),
      this.politicalPartySaveForTurnService.savePoliticalPartiesForTurn(turnDataContext.politicalParties),
      this.productRepository.saveMany(turnDataContext.products),
      this.sectorRepository.saveMany(turnDataContext.sectors),
    ]);
  }

  private async saveHistoricalDatas(turnDataContext: TurnDataContext): Promise<void> {
    await Promise.all([
      this.stateRevenuePerTurnSaveService.saveStateEconomicalSituationForMonth(turnDataContext.state, turnDataContext.game.turn),
      this.socialClassEconomicalSituationPerTurnSaveService.saveSocialClassesEconomicalSituationForTurn(turnDataContext.socialClasses, turnDataContext.game.turn),
      this.socialClassHappinessPerTurnSaveService.saveSocialClassesHappinessForTurn(turnDataContext.socialClasses, turnDataContext.game.turn),
      this.productPricePerTurnSaveService.saveProductsPricesPerTurn(turnDataContext.products, turnDataContext.game.turn),
      this.sectorEconomicalSituationPerTurnSaveService.saveSectorsEconomicalSituationForTurn(turnDataContext.sectors, turnDataContext.game.turn),
      this.politicalPartyHappinessPerTurnSaveService.savePoliticalPartiesHappinessForTurn(
        turnDataContext.politicalParties,
        turnDataContext.game.turn,
      ),
    ]);
  }
}
