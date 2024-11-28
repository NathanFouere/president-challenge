import type { PoliticalPartyMinimalDTO } from '@shared/political-party/political-party-minimal-d-t-o';
import type { PoliticalPartyDTO } from '@shared/political-party/political-party-dto';
import FetchFactory from '../factory';
import Routes from '~~/server/repository/routes.client';

class PoliticalPartyModule extends FetchFactory {
  private readonly RESOURCE = Routes.PoliticalParty;

  public async getPoliticalParties(gameId: number): Promise<PoliticalPartyMinimalDTO[]> {
    return this.call<PoliticalPartyMinimalDTO[]>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetPoliticalParties(gameId)}`,
      },
    );
  };

  public async getPoliticalParty(politicalPartyId: number, gameId: number): Promise<PoliticalPartyDTO> {
    return this.call<PoliticalPartyDTO>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetPoliticalParty(politicalPartyId, gameId)}`,
      },
    );
  }
}

export default PoliticalPartyModule;
