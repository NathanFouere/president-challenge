export class GetLawVoteQuery {
  constructor(
    public readonly lawVoteId: number,
    public readonly lawId: number,
  ) {
  }
}
