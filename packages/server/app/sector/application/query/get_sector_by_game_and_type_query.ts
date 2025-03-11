import type { SectorTypes } from '@president-challenge/shared/dist/sector/sector-types.js';

export class GetSectorByGameAndTypeQuery {
  constructor(
    public readonly gameId: number,
    public readonly type: SectorTypes,
  ) {}
}
