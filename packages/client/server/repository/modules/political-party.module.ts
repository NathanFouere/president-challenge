import type { PoliticalParty } from '@shared/political-party/political-party';
import FetchFactory from '../factory';
import Routes from '~~/server/repository/routes.client';

class PoliticalPartyModule extends FetchFactory {
  private readonly RESOURCE = Routes.PoliticalParty;

  public async getPoliticalParties(gameId: number): Promise<PoliticalParty[]> {
    return this.call<PoliticalParty[]>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetPoliticalParties(gameId)}`,
      },
    );
  };
}

export default PoliticalPartyModule;
