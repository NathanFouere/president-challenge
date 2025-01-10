import type { SenateDto } from '@shared/legislature/senate-dto';
import type { LawGroupDto } from '@shared/legislature/law-group-dto';
import type { LawCategoryDto } from '@shared/legislature/law-category-dto';
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

  public async getParliament(gameId: number): Promise<LawGroupDto> {
    return this.call<LawGroupDto>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetParliament(gameId)}`,
      },
    );
  }

  public async getLawCategories(gameId: number): Promise<LawCategoryDto[]> {
    return this.call<LawCategoryDto[]>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetLawCategories(gameId)}`,
      },
    );
  }
}

export default LegislatureModule;
