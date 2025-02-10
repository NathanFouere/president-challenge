export default class GetLawByGameQuery {
  constructor(
    public readonly lawId: number,
    public readonly gameId: number,
  ) {
  }
}
