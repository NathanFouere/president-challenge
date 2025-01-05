import { inject } from '@adonisjs/core';
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

@inject()
export class LoadTurnService {
  constructor(
    private readonly getStateOfGameQueryHandler: IGetStateOfGameQueryHandler,
    private readonly getSectorsOfGameQueryHandler: IGetSectorsByGameQueryHandler,
    private readonly getPoliticalPartiesOfGameQueryHandler: IGetPoliticalPartiesOfGameQueryHandler,
  ) {
  }

  public async loadTurn(gameId: number): Promise<LoadTurnData> {
    const state = await this.getStateOfGameQueryHandler.handle(new GetStateOfGameQuery(
      gameId,
    ));
    const sectors = await this.getSectorsOfGameQueryHandler.handleForSwitchTurn(new GetSectorsByGameQuery(
      gameId,
    ));
    const products = sectors.map(sector => sector.products).flat();
    const socialClasses = sectors.map(sector => sector.socialClasses).flat();
    const politicalParties = await this.getPoliticalPartiesOfGameQueryHandler.handleForSwitchTurn(new GetPoliticalPartiesOfGameQuery(
      gameId,
    ));

    return {
      state,
      sectors,
      products,
      socialClasses,
      politicalParties,
    };
  }
}

export interface LoadTurnData {
  state: State;
  sectors: Sector[];
  products: Product[];
  socialClasses: SocialClass[];
  politicalParties: PoliticalParty[];
}
