import { inject } from '@adonisjs/core';

import { SocialClassTypes } from '@president-challenge/shared/dist/social-class/social-class-types.js';

import type { GameTurnProcessStreamData } from '@president-challenge/shared/dist/game/game-turn-process-stream-data.js';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetPoliticalPartiesOfGameQueryHandler
  from '#political-party/application/queries/i_get_political_parties_of_game_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetStateOfGameQueryHandler from '#state/application/query/i_get_state_of_game_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSectorsByGameQueryHandler from '#sector/application/query/i_get_sectors_by_game_query_handler';
import type State from '#state/domain/model/state';
import type Sector from '#sector/domain/model/sector';
import type PoliticalParty from '#political-party/domain/models/political_party';
import type Product from '#product/domain/models/product';
import type SocialClass from '#social-class/domain/models/social_class';
import { GetStateOfGameQuery } from '#state/application/query/get_state_of_game_query';
import { GetSectorsByGameQuery } from '#sector/application/query/get_sectors_by_game_query';
import GetPoliticalPartiesOfGameQuery from '#political-party/application/queries/get_political_parties_of_game_query';
import type Game from '#game/domain/models/game';
import type Tax from '#tax/domain/model/tax';
import type Budget from '#budget/domain/model/budget';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSocialClassesOfGameQueryHandler
  from '#social-class/application/queries/i_get_social_classes_of_game_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetProductsOfGameQueryHandler from '#product/application/query/i_get_products_of_game_query_handler';
import { GetSocialClassesOfGameQuery } from '#social-class/application/queries/get_social_classes_of_game_query';
import { GetProductsOfGameQuery } from '#product/application/query/get_products_of_game_query';

@inject()
export class LoadTurnDataContextService {
  constructor(
    private readonly getStateOfGameQueryHandler: IGetStateOfGameQueryHandler,
    private readonly getSectorsOfGameQueryHandler: IGetSectorsByGameQueryHandler,
    private readonly getPoliticalPartiesOfGameQueryHandler: IGetPoliticalPartiesOfGameQueryHandler,
    private readonly getSocialClassesOfGameQueryHandler: IGetSocialClassesOfGameQueryHandler,
    private readonly getProductsOfGameQueryHandler: IGetProductsOfGameQueryHandler,
  ) {
  }

  public async load(game: Game, gameTurnProcessStreamContainer: GameTurnProcessStreamData): Promise<TurnDataContext> {
    gameTurnProcessStreamContainer.message = 'Loading turn data context';

    const [state, sectors, politicalParties, socialClasses, products] = await Promise.all([
      this.getStateOfGameQueryHandler.handleForSwitchTurn(new GetStateOfGameQuery(game.id)),
      this.getSectorsOfGameQueryHandler.handleForSwitchTurn(new GetSectorsByGameQuery(game.id)),
      this.getPoliticalPartiesOfGameQueryHandler.handleForSwitchTurn(new GetPoliticalPartiesOfGameQuery(game.id)),
      this.getSocialClassesOfGameQueryHandler.handleForSwitchTurn(new GetSocialClassesOfGameQuery(game.id)),
      this.getProductsOfGameQueryHandler.handleForSwitchTurn(new GetProductsOfGameQuery(game.id)),
    ]);

    state.setFinancialFlows([]);

    const socialClassesPerType = this.mapSocialClassesToSectorsAndGroupByType(socialClasses, sectors);

    return {
      game,
      budgets: state.budgets,
      state,
      taxes: state.taxes,
      sectors,
      products,
      socialClasses,
      politicalParties,
      socialClassesPerType,
    };
  }

  private mapSocialClassesToSectorsAndGroupByType(
    socialClasses: SocialClass[],
    sectors: Sector[],
  ): SocialClassesPerType {
    const socialClassesPerType: SocialClassesPerType = {
      businessOwner: [] as SocialClass[],
      middleClass: [] as SocialClass[],
      workingClass: [] as SocialClass[],
    };

    for (const sector of sectors) {
      sector.setSocialClasses([]);
    }

    for (const socialClass of socialClasses) {
      socialClass.setFinancialFlows([]);
      const sector = sectors.find(sector => sector.id === socialClass.sectorId);
      if (sector) {
        sector.socialClasses.push(socialClass);
        socialClass.setSector(sector);
      }

      if (socialClass.definition.type === SocialClassTypes.BUSINESS_OWNER) {
        socialClassesPerType.businessOwner.push(socialClass);
      }
      else if (socialClass.definition.type === SocialClassTypes.MIDDLE_CLASS) {
        socialClassesPerType.middleClass.push(socialClass);
      }
      else if (socialClass.definition.type === SocialClassTypes.WORKING_CLASS) {
        socialClassesPerType.workingClass.push(socialClass);
      }
    }

    return socialClassesPerType;
  }
}

export interface TurnDataContext {
  game: Game;
  budgets: Budget[];
  state: State;
  taxes: Tax[];
  sectors: Sector[];
  products: Product[];
  socialClasses: SocialClass[];
  politicalParties: PoliticalParty[];
  socialClassesPerType: SocialClassesPerType;
}

export interface SocialClassesPerType {
  businessOwner: SocialClass[];
  workingClass: SocialClass[];
  middleClass: SocialClass[];
}
