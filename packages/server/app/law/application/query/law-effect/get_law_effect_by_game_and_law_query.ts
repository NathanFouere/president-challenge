import type { LawType } from '#law/domain/model/law_type';

export default class GetLawEffectByGameAndLawQuery {
  constructor(
    public readonly gameId: number,
    public readonly lawId: number,
    public readonly lawType: LawType,
  ) {
  }
}
