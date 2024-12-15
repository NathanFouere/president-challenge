import type { SenateDto } from '@shared/legislature/senate-dto';
import type { ParliamentDto } from '@shared/legislature/parliament-dto';
import FetchFactory from '~~/server/repository/factory';
import Routes from '~~/server/repository/routes.client';

class LegislatureModule extends FetchFactory {
  private readonly RESOURCE = Routes.Legislature;

  public async getSenate(gameId: number): Promise<SenateDto> {
    return this.call<SenateDto>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetSenate(gameId)}`,
      },
    );
  }

  public async getParliament(gameId: number): Promise<ParliamentDto> {
    return this.call<ParliamentDto>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetParliament(gameId)}`,
      },
    );
  }
}

export default LegislatureModule;
