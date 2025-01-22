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

@inject()
export class LoadTurnDataContextService {
  constructor(
    private readonly getStateOfGameQueryHandler: IGetStateOfGameQueryHandler,
    private readonly getSectorsOfGameQueryHandler: IGetSectorsByGameQueryHandler,
    private readonly getPoliticalPartiesOfGameQueryHandler: IGetPoliticalPartiesOfGameQueryHandler,
  ) {
  }

  public async load(game: Game): Promise<TurnDataContext> {
    const state = await this.getStateOfGameQueryHandler.handleForSwitchTurn(new GetStateOfGameQuery(
      game.id,
    ));
    const sectors = await this.getSectorsOfGameQueryHandler.handleForSwitchTurn(new GetSectorsByGameQuery(
      game.id,
    ));
    const socialClasses = this.loadSocialClassesFromSectors(sectors);
    const products = this.loadProductsFromSectors(sectors);
    const politicalParties = await this.getPoliticalPartiesOfGameQueryHandler.handleForSwitchTurn(new GetPoliticalPartiesOfGameQuery(
      game.id,
    ));

    const socialClassesPerType = this.loadSocialClassesPerType(socialClasses);

    return {
      game,
      state,
      sectors,
      products,
      socialClasses,
      politicalParties,
      socialClassesPerType,
    };
  }

  private loadSocialClassesFromSectors(sectors: Sector[]): SocialClass[] {
    return sectors.map(sector => sector.socialClasses).flat();
  }

  private loadSocialClassesPerType(socialClasses: SocialClass[]): SocialClassesPerType {
    return {
      capitalist: socialClasses.filter(socialClass => socialClass.type === SocialClassTypes.CAPITALIST),
      proletariat: socialClasses.filter(socialClass => socialClass.type === SocialClassTypes.PROLETARIAT),
      petiteBourgeoisie: socialClasses.filter(socialClass => socialClass.type === SocialClassTypes.PETIT_BOURGEOIS),
    };
  }

  private loadProductsFromSectors(sectors: Sector[]): Product[] {
    return sectors.map(sector => sector.products).flat();
  }
}

export interface TurnDataContext {
  game: Game;
  state: State;
  sectors: Sector[];
  products: Product[];
  socialClasses: SocialClass[];
  politicalParties: PoliticalParty[];
  socialClassesPerType: SocialClassesPerType;
}

export interface SocialClassesPerType {
  capitalist: SocialClass[];
  proletariat: SocialClass[];
  petiteBourgeoisie: SocialClass[];
}
