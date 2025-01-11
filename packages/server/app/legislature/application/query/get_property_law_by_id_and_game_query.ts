export class GetPropertyLawByIdAndGameQuery {
  constructor(
    public readonly gameId: number,
    public readonly lawId: number,
  ) {
  }
}
