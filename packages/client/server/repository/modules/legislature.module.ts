import type { SenateDto } from '@president-challenge/shared/dist/legislature/senate-dto';
import type { LawCategoryDto } from '@president-challenge/shared/dist/legislature/law-category-dto';
import type { ParliamentDto } from '@president-challenge/shared/dist/legislature/parliament-dto';
import type { LawDto } from '@president-challenge/shared/dist/legislature/law-dto';
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

  public async getLaw(gameId: number, lawId: number): Promise<LawDto> {
    return this.call<LawDto>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetLaw(gameId, lawId)}`,
      },
    );
  }

  public async voteLaw(gameId: number, lawId: number): Promise<void> {
    return this.call(
      {
        method: 'POST',
        url: `${this.RESOURCE.VoteLaw(gameId, lawId)}`,
      },
    );
  }
}

export default LegislatureModule;
