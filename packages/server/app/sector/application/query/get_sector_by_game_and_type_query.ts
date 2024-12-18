import type { SectorTypes } from '@shared/types/sector/sector-types.js';

export class GetSectorByGameAndTypeQuery {
  constructor(
    public readonly gameId: number,
    public readonly type: SectorTypes,
  ) {}
}
