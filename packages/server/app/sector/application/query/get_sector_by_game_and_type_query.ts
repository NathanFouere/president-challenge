import type { SectorTypes } from '@shared/dist/sector/sector-types.js';

export class GetSectorByGameAndTypeQuery {
  constructor(
    public readonly gameId: number,
    public readonly type: SectorTypes,
  ) {}
}
