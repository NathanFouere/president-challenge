import type { SenateDto } from '@shared/legislature/senate-dto';
import type { LawCategoryDto } from '@shared/legislature/law-category-dto';
import type { MinimalLawDto } from '@shared/legislature/minimal-law-dto';
import type { ParliamentDto } from '@shared/legislature/parliament-dto';
import type { LawType } from '@shared/legislature/law-type';
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

  public async getLawCategories(gameId: number): Promise<LawCategoryDto[]> {
    return this.call<LawCategoryDto[]>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetLawCategories(gameId)}`,
      },
    );
  }

  public async getLaw(gameId: number, lawId: number, type: LawType): Promise<MinimalLawDto> {
    return this.call<MinimalLawDto>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetLaw(gameId, lawId, type)}`,
      },
    );
  }
}

export default LegislatureModule;
