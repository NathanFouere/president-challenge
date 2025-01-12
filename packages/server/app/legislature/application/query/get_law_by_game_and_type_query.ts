import type { LawType } from '@shared/dist/legislature/law-type.js';

export default class GetLawByGameAndTypeQuery {
  constructor(
    public readonly lawId: number,
    public readonly gameId: number,
    public readonly lawType: LawType,
  ) {
  }
}
