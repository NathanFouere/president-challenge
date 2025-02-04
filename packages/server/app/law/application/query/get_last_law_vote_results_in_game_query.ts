import type { LegislatureType } from '#legislature/domain/models/legislature_type';

export default class GetLastLawVoteResultsInGameQuery {
  constructor(
    public readonly lawId: number,
    public readonly legislatureType: LegislatureType,
  ) {
  }
}
