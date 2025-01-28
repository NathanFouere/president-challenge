import { inject } from '@adonisjs/core';

import { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
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
import type Budget from '#state/domain/model/budget';
import type StateTurnFinancialFlows from '#state/domain/model/state_turn_financial_flows';
import { aStateTurnFinancialFlows } from '#state/application/builder/state_turn_financial_flows_builder';
import type SocialClassTurnFinancialFlows from '#social-class/domain/models/social_class_turn_financial_flows';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSocialClassesOfGameQueryHandler
  from '#social-class/application/queries/i_get_social_classes_of_game_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetProductsOfGameQueryHandler from '#product/application/query/i_get_products_of_game_query_handler';
import { GetSocialClassesOfGameQuery } from '#social-class/application/queries/get_social_classes_of_game_query';
import { GetProductsOfGameQuery } from '#product/application/query/get_products_of_game_query';
import {
  aSocialClassTurnFinancialFlows,
} from '#social-class/application/builders/social_class_turn_financial_flows_builder';

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

  public async load(game: Game): Promise<TurnDataContext> {
    const [state, sectors, politicalParties, socialClasses, products] = await Promise.all([
      this.getStateOfGameQueryHandler.handleForSwitchTurn(new GetStateOfGameQuery(game.id)),
      this.getSectorsOfGameQueryHandler.handleForSwitchTurn(new GetSectorsByGameQuery(game.id)),
      this.getPoliticalPartiesOfGameQueryHandler.handleForSwitchTurn(new GetPoliticalPartiesOfGameQuery(game.id)),
      this.getSocialClassesOfGameQueryHandler.handleForSwitchTurn(new GetSocialClassesOfGameQuery(game.id)),
      this.getProductsOfGameQueryHandler.handleForSwitchTurn(new GetProductsOfGameQuery(game.id)),
    ]);

    const stateTurnFinancialFlows = await aStateTurnFinancialFlows()
      .withTurn(game.turn)
      .withStateId(state.id)
      .exist();

    const stateTurnContext = {
      state,
      stateTurnFinancialFlows,
    };

    const socialClassesTurnContexts = await this.mapSocialClassesToSocialClassTurnContexts(socialClasses, game.turn);

    const socialClassesPerType = this.mapSocialClassesToSectorsAndGroupByType(socialClassesTurnContexts, sectors);

    return {
      game,
      budgets: state.budgets,
      stateTurnContext,
      taxes: state.taxes,
      sectors,
      products,
      socialClassesTurnContexts,
      politicalParties,
      socialClassesPerType,
    };
  }

  private async mapSocialClassesToSocialClassTurnContexts(socialClasses: SocialClass[], turn: number): Promise<SocialClassTurnContext[]> {
    const socialClassTurnsContextsPromises = socialClasses.map(socialClass => this.mapSocialClassToSocialClassTurnContext(socialClass, turn));
    return await Promise.all(socialClassTurnsContextsPromises);
  }

  private async mapSocialClassToSocialClassTurnContext(socialClass: SocialClass, turn: number): Promise<SocialClassTurnContext> {
    const socialClassTurnFinancialFlows = await aSocialClassTurnFinancialFlows()
      .withSocialClassId(socialClass.id)
      .withTurn(turn)
      .exist();

    return {
      socialClass,
      socialClassTurnFinancialFlows,
    };
  }

  private mapSocialClassesToSectorsAndGroupByType(
    socialClassesTurnContexts: SocialClassTurnContext[],
    sectors: Sector[],
  ): SocialClassesPerType {
    const socialClassesPerType = {
      capitalist: [] as SocialClass[],
      proletariat: [] as SocialClass[],
      petiteBourgeoisie: [] as SocialClass[],
    };

    for (const sector of sectors) {
      sector.socialClasses = [];
    }

    for (const socialClassTurnContext of socialClassesTurnContexts) {
      const sector = sectors.find(sector => sector.id === socialClassTurnContext.socialClass.sectorId);
      if (sector) {
        sector.socialClasses.push(socialClassTurnContext.socialClass);
        socialClassTurnContext.socialClass.sector = sector;
      }

      if (socialClassTurnContext.socialClass.type === SocialClassTypes.CAPITALIST) {
        socialClassesPerType.capitalist.push(socialClassTurnContext.socialClass);
      }
      else if (socialClassTurnContext.socialClass.type === SocialClassTypes.PROLETARIAT) {
        socialClassesPerType.proletariat.push(socialClassTurnContext.socialClass);
      }
      else if (socialClassTurnContext.socialClass.type === SocialClassTypes.PETIT_BOURGEOIS) {
        socialClassesPerType.petiteBourgeoisie.push(socialClassTurnContext.socialClass);
      }
    }

    return socialClassesPerType;
  }
}

export interface TurnDataContext {
  game: Game;
  budgets: Budget[];
  stateTurnContext: StateTurnContext;
  taxes: Tax[];
  sectors: Sector[];
  products: Product[];
  socialClassesTurnContexts: SocialClassTurnContext[];
  politicalParties: PoliticalParty[];
  socialClassesPerType: SocialClassesPerType;
}

export interface SocialClassesPerType {
  capitalist: SocialClass[];
  proletariat: SocialClass[];
  petiteBourgeoisie: SocialClass[];
}

export interface SocialClassTurnContext {
  socialClass: SocialClass;
  socialClassTurnFinancialFlows: SocialClassTurnFinancialFlows;
}

export interface StateTurnContext {
  state: State;
  stateTurnFinancialFlows: StateTurnFinancialFlows;
}
