import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGameRepository from '#game/domain/repository/i_game_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SocialClassRepository from '#social-class/infrastructure/repository/social_class_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import PoliticalPartyRepository from '#political-party/infrastructure/repositories/political_party_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ProductRepository from '#product/infrastructure/repository/product_repository';
import type Game from '#game/domain/models/game';
import type SocialClass from '#social-class/domain/models/social_class';
import type PoliticalParty from '#political-party/domain/models/political_party';
import type Product from '#product/domain/models/product';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SectorRepository from '#sector/infrastructure/repository/sector_repository';
import type Sector from '#sector/domain/model/sector';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { StateRevenuePerTurnSaveService } from '#state/domain/service/state_economical_situation_per_turn_save_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ProductPricePerTurnSaveService } from '#product/domain/service/product_price_per_turn_save_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  SocialClassEconomicalSituationPerTurnSaveService,
} from '#social-class/domain/service/social_class_economical_situation_per_turn_save_service';
import type State from '#state/domain/model/state';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  SectorEconomicalSituationPerTurnSaveService,
} from '#sector/domain/service/sector_economical_situation_per_turn_save_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import StateRepository from '#state/infrastructure/repository/state_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  SocialClassHappinessPerTurnSaveService,
} from '#social-class/domain/service/social_class_happiness_per_turn_save_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  PoliticalPartyHappinessPerTurnSaveService,
} from '#political-party/domain/service/political_party_happiness_per_turn_save_service';

@inject()
export default class SaveTurnService {
  constructor(
    private readonly gameRepository: IGameRepository,
    private readonly socialClassRepository: SocialClassRepository,
    private readonly politicalPartyRepository: PoliticalPartyRepository,
    private readonly productRepository: ProductRepository,
    private readonly sectorRepository: SectorRepository,
    private readonly stateRevenuePerTurnSaveService: StateRevenuePerTurnSaveService,
    private readonly productPricePerTurnSaveService: ProductPricePerTurnSaveService,
    private readonly socialClassEconomicalSituationPerTurnSaveService: SocialClassEconomicalSituationPerTurnSaveService,
    private readonly sectorEconomicalSituationPerTurnSaveService: SectorEconomicalSituationPerTurnSaveService,
    private readonly socialClassHappinessPerTurnSaveService: SocialClassHappinessPerTurnSaveService,
    private readonly politicalPartyHappinessPerTurnSaveService: PoliticalPartyHappinessPerTurnSaveService,
    private readonly stateRepository: StateRepository,
  ) {

  }

  public async saveForTurn(game: Game, socialClasses: SocialClass[], politicalParties: PoliticalParty[], products: Product[], sectors: Sector[], state: State, turn: number): Promise<void> {
    await this.saveGlobalDatas(game, state, socialClasses, politicalParties, products, sectors);
    await this.saveHistoricalDatas(state, socialClasses, politicalParties, products, sectors, turn);
  }

  private async saveGlobalDatas(game: Game, state: State, socialClasses: SocialClass[], politicalParties: PoliticalParty[], products: Product[], sectors: Sector[]): Promise<void> {
    await Promise.all([
      this.gameRepository.save(game),
      this.stateRepository.save(state),
      this.socialClassRepository.saveMany(socialClasses),
      this.politicalPartyRepository.saveMany(politicalParties),
      this.productRepository.saveMany(products),
      this.sectorRepository.saveMany(sectors),
    ]);
  }

  private async saveHistoricalDatas(state: State, socialClasses: SocialClass[], politicalParties: PoliticalParty[], products: Product[], sectors: Sector[], turn: number): Promise<void> {
    await Promise.all([
      this.stateRevenuePerTurnSaveService.saveStateEconomicalSituationForMonth(state, turn),
      this.socialClassEconomicalSituationPerTurnSaveService.saveSocialClassesEconomicalSituationForTurn(socialClasses, turn),
      this.socialClassHappinessPerTurnSaveService.saveSocialClassesHappinessForTurn(socialClasses, turn),
      this.productPricePerTurnSaveService.saveProductsPricesPerTurn(products, turn),
      this.sectorEconomicalSituationPerTurnSaveService.saveSectorsEconomicalSituationForTurn(sectors, turn),
      this.politicalPartyHappinessPerTurnSaveService.savePoliticalPartiesHappinessForTurn(
        politicalParties,
        turn,
      ),
    ]);
  }
}
