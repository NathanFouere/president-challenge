import type { LegislatureType } from '#legislature/domain/models/legislature_type';

export default class GetLawVoteResultOfLawForElectionQuery {
  constructor(
    public readonly lawId: number,
    public readonly turn: number,
    public readonly legislatureType: LegislatureType,
  ) {
  }
}
