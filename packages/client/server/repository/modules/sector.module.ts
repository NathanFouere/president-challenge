import type { SectorDto } from '@shared/sector/sector-dto';
import FetchFactory from '../factory';
import Routes from '../routes.client';

class SectorModule extends FetchFactory {
  private readonly RESOURCE = Routes.Sector;

  public async getSectors(gameId: number): Promise<SectorDto[]> {
    return this.call<SectorDto[]>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetSectors(gameId)}`,
      },
    );
  };

  public async getSector(gameId: number, sectorId: number): Promise<SectorDto> {
    return this.call<SectorDto>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetSector(gameId, sectorId)}`,
      },
    );
  };
}

export default SectorModule;
